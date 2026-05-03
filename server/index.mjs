import { createReadStream, existsSync, mkdirSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const dataDir = path.join(projectRoot, 'data');
const distDir = path.join(projectRoot, 'dist');
const dbPath = process.env.TRIPLINK_DB_PATH || path.join(dataDir, 'triplink.db');
const port = Number(process.env.TRIPLINK_PORT || process.env.PORT || 8787);
const apiOnly = process.argv.includes('--api-only');
const adminPasscode =
  process.env.TRIPLINK_ADMIN_PASSCODE ||
  process.env.VITE_ADMIN_PASSCODE ||
  'triplink-admin';
const maxBodyBytes = Number(process.env.TRIPLINK_MAX_BODY_MB || 35) * 1024 * 1024;

mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    content_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, text) {
  response.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(text);
}

function isAuthorized(request) {
  const passcodeHeader = request.headers['x-admin-passcode'];
  const authHeader = request.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  return passcodeHeader === adminPasscode || bearerToken === adminPasscode;
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;

    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBodyBytes) {
        reject(new Error('Request body is too large'));
        request.destroy();
        return;
      }
      body += chunk;
    });

    request.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });

    request.on('error', reject);
  });
}

function getStoredContent() {
  const row = db
    .prepare('SELECT content_json, updated_at FROM site_content WHERE id = 1')
    .get();

  if (!row) {
    return {
      content: null,
      source: 'empty',
      updatedAt: null,
    };
  }

  return {
    content: JSON.parse(row.content_json),
    source: 'db',
    updatedAt: row.updated_at,
  };
}

function saveContent(content) {
  const updatedAt = new Date().toISOString();

  db.prepare(`
    INSERT INTO site_content (id, content_json, updated_at)
    VALUES (1, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      content_json = excluded.content_json,
      updated_at = excluded.updated_at
  `).run(JSON.stringify(content), updatedAt);

  return updatedAt;
}

function resetContent() {
  db.prepare('DELETE FROM site_content WHERE id = 1').run();
}

async function handleApi(request, response, url) {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Passcode',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    });
    response.end();
    return;
  }

  if (url.pathname === '/api/health' && request.method === 'GET') {
    sendJson(response, 200, {
      ok: true,
      db: path.relative(projectRoot, dbPath),
      mode: apiOnly ? 'api' : 'full',
    });
    return;
  }

  if (url.pathname === '/api/admin/login' && request.method === 'POST') {
    const body = await readJsonBody(request);
    if (body.passcode === adminPasscode) {
      sendJson(response, 200, { ok: true });
      return;
    }
    sendJson(response, 401, { ok: false, error: 'Invalid admin passcode' });
    return;
  }

  if (url.pathname === '/api/content' && request.method === 'GET') {
    sendJson(response, 200, getStoredContent());
    return;
  }

  if (url.pathname === '/api/content' && request.method === 'PUT') {
    if (!isAuthorized(request)) {
      sendJson(response, 401, { ok: false, error: 'Unauthorized' });
      return;
    }

    const body = await readJsonBody(request);
    const content = body.content || body;

    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      sendJson(response, 400, { ok: false, error: 'Content payload is required' });
      return;
    }

    const updatedAt = saveContent(content);
    sendJson(response, 200, { ok: true, updatedAt });
    return;
  }

  if (url.pathname === '/api/content' && request.method === 'DELETE') {
    if (!isAuthorized(request)) {
      sendJson(response, 401, { ok: false, error: 'Unauthorized' });
      return;
    }

    resetContent();
    sendJson(response, 200, { ok: true });
    return;
  }

  sendJson(response, 404, { ok: false, error: 'API route not found' });
}

async function serveStatic(request, response, url) {
  if (!existsSync(distDir)) {
    sendText(
      response,
      503,
      'Build folder not found. Run "npm run build" before starting the production server.',
    );
    return;
  }

  const requestedPath = decodeURIComponent(url.pathname);
  const safePath = requestedPath === '/' ? '/index.html' : requestedPath;
  const filePath = path.resolve(distDir, `.${safePath}`);

  if (!filePath.startsWith(distDir)) {
    sendText(response, 403, 'Forbidden');
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      throw new Error('Not a file');
    }

    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Cache-Control': safePath === '/index.html' ? 'no-store' : 'public, max-age=31536000, immutable',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    const indexHtml = await readFile(path.join(distDir, 'index.html'));
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    response.end(indexHtml);
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  try {
    if (url.pathname.startsWith('/api/')) {
      await handleApi(request, response, url);
      return;
    }

    if (apiOnly) {
      sendJson(response, 404, { ok: false, error: 'API server only' });
      return;
    }

    await serveStatic(request, response, url);
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : 'Unexpected server error',
    });
  }
});

server.listen(port, () => {
  console.log(`Triplink local DB server running on http://127.0.0.1:${port}`);
  console.log(`SQLite file: ${dbPath}`);
});
