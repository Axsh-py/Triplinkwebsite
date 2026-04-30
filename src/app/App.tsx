import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TopBanner } from './components/TopBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { TripsPage } from './pages/TripsPage';
import { TripDetailPage } from './pages/TripDetailPage';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {!isAdminPage && <TopBanner />}
      {!isHomePage && !isAdminPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:tripId" element={<TripDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingCTA />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
}
