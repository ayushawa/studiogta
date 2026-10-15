import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Contact from './pages/Contact';

function MainRouter({ onOpenBooking }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-wrap" style={{ minHeight: '100%' }}>
      <Routes location={location}>
        <Route path="/" element={<Home onOpenBooking={() => onOpenBooking()} />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio onOpenBooking={() => onOpenBooking()} />} />
        <Route path="/services" element={<Services onOpenBooking={() => onOpenBooking()} />} />
        
        {/* Package and Direct Booking Routes */}
        <Route path="/packages" element={<Packages onOpenBookingWithPackage={(pkgId) => onOpenBooking(pkgId)} />} />
        <Route path="/packages/book" element={<Packages onOpenBookingWithPackage={(pkgId) => onOpenBooking(pkgId)} />} />
        <Route path="/book" element={<Packages onOpenBookingWithPackage={(pkgId) => onOpenBooking(pkgId || 'hdr-photography')} />} />
        <Route path="/booking" element={<Packages onOpenBookingWithPackage={(pkgId) => onOpenBooking(pkgId || 'video-photo')} />} />
        
        <Route path="/contact" element={<Contact />} />
        
        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState('');

  const handleOpenBooking = (pkgId = '') => {
    setSelectedPackageId(pkgId);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <ErrorBoundary>
      {/* Branded Luxury Loading Experience (Initial Startup Only) */}
      <LoadingScreen />

      <BrowserRouter>
        <ScrollToTop />
        <div className="site-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Global Top Information Bar */}
          <TopBar />

          {/* Global Intelligent Scroll-Responsive Navigation Header */}
          <Header onOpenBooking={() => handleOpenBooking()} />

          {/* Main Content Router with Subtle Smooth Page Transitions */}
          <main style={{ flexGrow: 1 }}>
            <MainRouter onOpenBooking={handleOpenBooking} />
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Global Accessible Booking Modal */}
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={handleCloseBooking}
            initialPackageId={selectedPackageId}
          />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
