import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
      <SeoHead title="Page Not Found | EMI Calculators" description="The page you are looking for does not exist." />
      <div className="text-blue-600 font-extrabold text-9xl mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">We couldn't find that page</h1>
      <p className="text-gray-600 mb-8 max-w-md text-center text-lg">
        The tool or article you are looking for has been moved or no longer exists. Find calculators and fresh content on our homepage.
      </p>
      <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
        <Home className="mr-2 h-5 w-5" /> Go to Homepage
      </Link>
    </div>
  );
}
