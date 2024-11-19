import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface BondCalculatorProps {
  className?: string;
}

const BondCalculator: React.FC<BondCalculatorProps> = ({ className = '' }) => {
  const [purchasePrice, setPurchasePrice] = useState(100000);
  const [deposit, setDeposit] = useState(20000);
  const [interestRate, setInterestRate] = useState(14);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [minIncome, setMinIncome] = useState(0);

  const calculateBond = useCallback(() => {
    const principal = purchasePrice - deposit;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly repayment calculation using the mortgage payment formula
    const monthlyPayment = 
      principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Estimate total costs (transfer duty + legal fees) - simplified calculation
    const totalCosts = principal * 0.13; // 13% of loan amount as rough estimate

    // Minimum required income (using 30% of gross monthly income as maximum bond payment)
    const requiredIncome = monthlyPayment / 0.3;

    setMonthlyRepayment(Math.round(monthlyPayment));
    setTotalCosts(Math.round(totalCosts));
    setMinIncome(Math.round(requiredIncome));
  }, [purchasePrice, deposit, interestRate, loanTerm]);

  // Use useEffect with the memoized callback
  React.useEffect(() => {
    calculateBond();
  }, [calculateBond]);

  const formatCurrency = (value: number) => {
    return `USD ${value.toLocaleString('en')}`;
  };

  return (
    <Card className={`p-6 mt-4 max-w-3xl mx-auto ${className}`}>
      <h2 className="text-2xl font-semibold mb-6">Bond Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Purchase Price 
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="pl-8 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Deposit (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="pl-8 w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 p-2 pr-8"
              />
              <span className="absolute right-3 top-2.5">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Loan Term
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="5"
                max="30"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="text-sm text-gray-600">{loanTerm} years</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <label className="block text-sm font-medium mb-2">
              Monthly Repayment:
            </label>
            <div className="text-2xl font-bold text-emerald-700">
              {formatCurrency(monthlyRepayment)}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium mb-2">
              Total Once-off Costs:
            </label>
            <div className="text-xl font-semibold text-gray-700">
              {formatCurrency(totalCosts)}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium mb-2">
              Min Gross Monthly Income:
            </label>
            <div className="text-xl font-semibold mb-4 text-gray-700">
              {formatCurrency(minIncome)}
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/calculators" className="block w-full bg-emerald-600 mt-4 text-sm text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors text-center">
              Calculate Affordability Using Income
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        *Disclaimer: Please note that by default this calculator uses the prime interest rate for bond payment calculations. This is purely for convenience and not an indication of the interest rate that might be offered to you by a bank. This calculator is intended to provide estimates based on the specified amounts, rates and fees. Whilst we make every effort to ensure the accuracy of these calculations, we cannot be held liable for inaccuracies.
      </div>
    </Card>
  );
};

export default BondCalculator;