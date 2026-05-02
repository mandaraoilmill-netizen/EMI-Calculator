import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { CalculatorWidget } from '../components/CalculatorWidget';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Home, Car, User } from 'lucide-react';

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "EMI Calculator",
    "url": import.meta.env.VITE_APP_URL || "https://www.emi-calculator.com",
    "description": "Calculate your Equated Monthly Installment (EMI) for Home Loans, Car Loans, and Personal Loans instantly.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All"
  };

  return (
    <div className="w-full">
      <SeoHead 
        title="EMI Calculator - Calculate Home, Car & Personal Loan EMI"
        description="Calculate your Equated Monthly Installment (EMI) instantly. Use our free EMI calculator for home loans, car loans, and personal loans. Get accurate breakdown of interest and principal."
        keywords="EMI calculator, Loan EMI calculator, calculate EMI, equated monthly installment, home loan emi, car loan emi"
        schema={schema}
        canonical="/"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Calculate your <span className="text-blue-600">Loan EMI</span> instantly
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Plan your finances better with our accurate EMI calculator. Find out your monthly payments, interest breakdown, and total cost for any loan.
          </p>
          
          <div className="max-w-5xl mx-auto text-left">
            <CalculatorWidget loanType="Generic Loan" defaultAmount={1000000} defaultRate={9} defaultTenureYears={5} />
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-blue lg:prose-lg">
          <h2>What is an EMI Calculator?</h2>
          <p>
            An <strong>EMI calculator</strong> is a financial tool that helps you calculate your Equated Monthly Installment (EMI) for any type of loan. Whether you are taking a home loan, car loan, or personal loan, our online tool provides a clear breakdown of your monthly payment, the principal amount, and the total interest payable over the loan tenure.
          </p>

          <h3>How is EMI Calculated?</h3>
          <p>
            The mathematical formula to calculate EMI is:
          </p>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center font-mono my-6 shadow-sm">
            EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
          </div>
          <p>Where:</p>
          <ul>
            <li><strong>P</strong> stands for the Principal Loan Amount</li>
            <li><strong>R</strong> stands for the monthly interest rate (Annual Rate / 12 / 100)</li>
            <li><strong>N</strong> stands for the loan tenure in months (Years * 12)</li>
          </ul>

          <h3>Why use our Loan EMI Calculator?</h3>
          <ul>
            <li><strong>Instant & Accurate:</strong> Get exact numbers without complex manual calculations.</li>
            <li><strong>Visual Breakdown:</strong> See how much of your payment goes towards the principal versus the interest through our interactive pie chart.</li>
            <li><strong>Financial Planning:</strong> Use the sliders to adjust your tenure or loan amount to find an EMI that fits your monthly budget perfectly.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
