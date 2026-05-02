import React from 'react';
import { SeoHead } from '../components/SeoHead';
import { CalculatorWidget } from '../components/CalculatorWidget';

export default function PersonalLoanPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Personal Loan EMI Calculator",
    "url": `${import.meta.env.VITE_APP_URL || "https://www.emi-calculator.com"}/personal-loan-emi-calculator`,
    "description": "Personal Loan EMI Calculator. Quickly calculate your monthly installments for unsecured personal loans.",
    "applicationCategory": "FinanceApplication",
  };

  return (
    <div className="w-full">
      <SeoHead 
        title="Personal Loan EMI Calculator - Quick Installment Check"
        description="Calculate your personal loan EMI quickly. Figure out the interest component and total payment for your short term unsecured loans."
        keywords="Personal loan EMI calculator, unsecured loan EMI, short term loan calculator, personal finance"
        schema={schema}
        canonical="/personal-loan-emi-calculator"
      />

      <section className="bg-indigo-600 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Personal Loan EMI Calculator
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Get clarity on your short-term financial commitments before you borrow.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <CalculatorWidget loanType="Personal Loan" defaultAmount={500000} defaultRate={14.5} defaultTenureYears={3} maxTenureYears={7} />
      </section>

      <section className="py-16 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-indigo md:prose-lg">
          <h2>Managing Unsecured Debt</h2>
          <p>
            A personal loan is unsecured debt, meaning you don't have to put up collateral like a house or car. Because of the higher risk to the lender, personal loans usually carry higher interest rates compared to secured loans. Use our <strong>Personal Loan EMI Calculator</strong> to ensure the payments don't stretch your monthly budget.
          </p>
          <p>
            Whether it's for medical emergencies, a wedding, debt consolidation, or a vacation, knowing your EMI upfront will help you make an informed and safe financial decision. 
          </p>
        </div>
      </section>
    </div>
  );
}
