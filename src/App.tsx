/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import PromotionSection from './components/PromotionSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function HomePage() {
  return (
    <>
      <Hero />
      <MenuSection />
      <AboutSection />
      <PromotionSection />
      <ContactSection />
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-vh-100">
      {!isAdminPage && <Navbar />}
      <main>{children}</main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}







