import React, { useState, Suspense } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Calculator, Settings, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import NotFoundPage from './pages/NotFoundPage';

// Lazy loaded pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const HomeLoanPage = React.lazy(() => import('./pages/HomeLoanPage'));
const CarLoanPage = React.lazy(() => import('./pages/CarLoanPage'));
const PersonalLoanPage = React.lazy(() => import('./pages/PersonalLoanPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on navigation (handled primarily by React Router link later, but useful for generic scroll)
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Calculator className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-gray-900 tracking-tight">EMI<span className="text-blue-600">Calculator</span></span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
            </nav>

            <div className="hidden md:flex items-center space-x-4">
               <Link to="/admin" className="text-gray-400 hover:text-gray-900">
                  <Settings className="h-5 w-5" />
               </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50">Admin</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-lg text-white">EMI<span className="text-blue-400">Calculator</span></span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Your trusted source for accurate EMI calculations.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EMI Calculator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="home-loan-emi-calculator" element={<HomeLoanPage />} />
            <Route path="car-loan-emi-calculator" element={<CarLoanPage />} />
            <Route path="personal-loan-emi-calculator" element={<PersonalLoanPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}
