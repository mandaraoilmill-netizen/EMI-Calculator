import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { IndianRupee } from 'lucide-react';

interface EMIResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

interface CalculatorWidgetProps {
  defaultAmount?: number;
  defaultRate?: number;
  defaultTenureYears?: number;
  loanType?: string;
  maxTenureYears?: number;
}

const COLORS = ['#2563eb', '#60a5fa'];

export function CalculatorWidget({
  defaultAmount = 5000000,
  defaultRate = 8.5,
  defaultTenureYears = 20,
  loanType = 'Home Loan',
  maxTenureYears = 30
}: CalculatorWidgetProps) {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [rate, setRate] = useState<number>(defaultRate);
  const [tenure, setTenure] = useState<number>(defaultTenureYears);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const results = useMemo<EMIResult>(() => {
    const p = amount;
    const r = rate / 12 / 100;
    const n = tenure * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: p };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi,
      totalInterest,
      totalPayment,
    };
  }, [amount, rate, tenure]);

  const pieData = [
    { name: 'Principal Amount', value: amount },
    { name: 'Total Interest', value: results.totalInterest }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
      <div className="p-6 md:p-8 flex-1 border-b lg:border-b-0 lg:border-r border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{loanType} EMI Calculator</h3>
        
        <div className="space-y-8">
          {/* Amount Input */}
          <div>
             <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                <div className="flex items-center text-lg font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                  <IndianRupee className="w-4 h-4 mr-1 text-gray-500" />
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="bg-transparent border-none w-28 text-right focus:ring-0 focus:outline-none p-0"
                  />
                </div>
             </div>
             <input 
               type="range" 
               min="10000" 
               max="50000000" 
               step="50000"
               value={amount} 
               onChange={(e) => setAmount(Number(e.target.value))}
               className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>10,000</span>
                <span>5 Cr</span>
             </div>
          </div>

          {/* Rate Input */}
          <div>
             <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Interest Rate (% p.a.)</label>
                <div className="flex items-center text-lg font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                  <input 
                    type="number" 
                    value={rate}
                    step="0.1"
                    onChange={(e) => setRate(Number(e.target.value))}
                     className="bg-transparent border-none w-16 text-right focus:ring-0 focus:outline-none p-0"
                  />
                  <span className="ml-1 text-gray-500">%</span>
                </div>
             </div>
             <input 
               type="range" 
               min="1" 
               max="30" 
               step="0.1"
               value={rate} 
               onChange={(e) => setRate(Number(e.target.value))}
               className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1%</span>
                <span>30%</span>
             </div>
          </div>

          {/* Tenure Input */}
          <div>
             <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
                <div className="flex items-center text-lg font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-md border border-gray-200">
                  <input 
                    type="number" 
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="bg-transparent border-none w-16 text-right focus:ring-0 focus:outline-none p-0"
                  />
                  <span className="ml-1 text-gray-500">Yr</span>
                </div>
             </div>
             <input 
               type="range" 
               min="1" 
               max={maxTenureYears} 
               step="1"
               value={tenure} 
               onChange={(e) => setTenure(Number(e.target.value))}
               className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
             <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>1 Yr</span>
                <span>{maxTenureYears} Yrs</span>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 flex-1 bg-gray-50 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">EMI Breakdown</h3>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
             <div className="text-sm text-gray-500 mb-1">Equated Monthly Installment (EMI)</div>
             <div className="text-3xl font-bold text-blue-600">{formatCurrency(results.emi)}</div>
           </div>
           
           <div className="flex justify-between gap-4">
              <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                 <div className="text-xs text-gray-500 mb-1">Principal Amount</div>
                 <div className="text-lg font-semibold text-gray-900">{formatCurrency(amount)}</div>
              </div>
              <div className="flex-1 bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                 <div className="text-xs text-gray-500 mb-1">Total Interest</div>
                 <div className="text-lg font-semibold text-gray-900">{formatCurrency(results.totalInterest)}</div>
              </div>
           </div>

           <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="text-sm text-gray-500 mb-1">Total Payment (Principal + Interest)</div>
              <div className="text-xl font-bold text-gray-900">{formatCurrency(results.totalPayment)}</div>
           </div>
        </div>

        <div className="w-full h-[250px] relative mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend verticalAlign="bottom" height={20} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
