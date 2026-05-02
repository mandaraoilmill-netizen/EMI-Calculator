import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { CalculatorWidget } from '../components/CalculatorWidget';

export default function CarLoanPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Car Loan EMI Calculator",
    "url": `${import.meta.env.VITE_APP_URL || "https://www.emi-calculator.com"}/car-loan-emi-calculator`,
    "description": "Calculate your Car Loan EMI instantly. View the monthly payment schedule for your new or used car.",
    "applicationCategory": "FinanceApplication",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is the typical tenure for a car loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Car loans typically have a tenure ranging from 1 to 7 years. A shorter tenure means higher EMIs but lower total interest paid."
      }
    }]
  };

  return (
    <div className="w-full">
      <SeoHead 
        title="Car Loan EMI Calculator - Vehicle Loan EMI Check"
        description="Calculate your Car Loan EMI with our exact auto loan calculator. Adjust the interest rate and tenure to find an EMI that suits your budget."
        keywords="Car loan EMI calculator, auto loan EMI, vehicle loan calculator, calculate car EMI"
        schema={[schema, faqSchema]}
        canonical="/car-loan-emi-calculator"
      />

      <section className="bg-slate-800 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Car Loan EMI Calculator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Find out exactly how much that new car will cost you every month.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <CalculatorWidget loanType="Car Loan" defaultAmount={800000} defaultRate={9.5} defaultTenureYears={5} maxTenureYears={8} />
      </section>

      <section className="py-16 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate md:prose-lg">
          <h2>Drive Home Your Dream Car</h2>
          <p>
            Whether you are buying a brand new sedan, an SUV, or a pre-owned vehicle, financing is often the best route. Our <strong>Car Loan EMI Calculator</strong> allows you to fiddle with the principal auto loan amount, the bank's interest rate, and your preferred repayment period to find the sweet spot for your wallet.
          </p>
          <p>
            Auto loan interest rates are typically higher than home loans and the tenure is much shorter because cars depreciate over time. This makes understanding the monthly cash outflow critical before signing the paperwork.
          </p>

          <h3>Tips for taking a Car Loan</h3>
          <ul>
            <li><strong>Pay a larger down payment:</strong> This reduces the principal amount and consequently the interest levied over the life of the loan.</li>
            <li><strong>Keep tenure short:</strong> If your monthly budget permits, go for a 3 to 4-year tenure to minimize the total cost of the car.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
