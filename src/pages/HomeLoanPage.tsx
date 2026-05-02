import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { CalculatorWidget } from '../components/CalculatorWidget';

export default function HomeLoanPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Home Loan EMI Calculator",
    "url": `${import.meta.env.VITE_APP_URL || "https://www.emi-calculator.com"}/home-loan-emi-calculator`,
    "description": "Calculate your Home Loan EMI. Plan your housing loan payments with our accurate online calculator.",
    "applicationCategory": "FinanceApplication",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is a Home Loan EMI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Home Loan EMI is the fixed monthly payment you make to your lender to repay your housing loan. It includes both the principal amount and the interest."
      }
    }, {
      "@type": "Question",
      "name": "How to reduce my Home Loan EMI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reduce your Home Loan EMI by choosing a longer loan tenure, making a larger down payment, or negotiating a lower interest rate with your bank."
      }
    }]
  };

  return (
    <div className="w-full">
      <SeoHead 
        title="Home Loan EMI Calculator - Calculate Housing Loan EMI"
        description="Use our free Home Loan EMI Calculator to find your monthly housing loan payments. Get principal and interest breakdown instantly."
        keywords="Home loan EMI calculator, calculate home loan emi, housing loan calculator, home loan interest calculator"
        schema={[schema, faqSchema]}
        canonical="/home-loan-emi-calculator"
      />

      <section className="bg-blue-600 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Home Loan EMI Calculator
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Plan your dream home with confidence. Calculate exactly how much you need to set aside every month.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <CalculatorWidget loanType="Home Loan" defaultAmount={5000000} defaultRate={8.5} defaultTenureYears={20} />
      </section>

      <section className="py-16 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-blue md:prose-lg">
          <h2>Understanding Home Loan EMI</h2>
          <p>
            Buying a home is one of the biggest financial decisions you'll ever make. An accurate <strong>Home Loan EMI Calculator</strong> helps you structure your loan effectively by showing you exactly how much your monthly commitment will be.
          </p>
          <p>
            Unlike other loans, home loans usually have much larger principal amounts and longer tenures (often 15-30 years). Because of the long tenure, the total interest paid can sometimes approach or exceed the initial loan amount. Using our calculator helps you visualize this split.
          </p>
          
          <h3>Frequently Asked Questions</h3>
          <div className="not-prose space-y-4 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">What is a Home Loan EMI?</h4>
              <p className="text-gray-600">A Home Loan EMI is the fixed monthly payment you make to your lender to repay your housing loan. It includes both the principal amount and the interest.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2">How to reduce my Home Loan EMI?</h4>
              <p className="text-gray-600">You can reduce your Home Loan EMI by choosing a longer loan tenure, making a larger down payment, or negotiating a lower interest rate with your bank. However, remember that extending the tenure increases the total interest you pay over the life of the loan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
