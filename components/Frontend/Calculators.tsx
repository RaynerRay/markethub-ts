'use client'
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionItem} from "@/components/ui/accordion";
import BondCalculator from './BondCalculator';

interface CostsBreakdown {
  stampDuty: number;
  conveyancingFees: number;
  vat: number;
  sundries: number;
  bondRegistration: number;
  valuationFees: number;
  establishmentFees: number;
  applicationFees: number;
  total: number;
}

interface AffordabilityResult {
  qualifyAmount: number;
  monthlyRepayment: number;
}

const Calculators: React.FC = () => {
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [netIncome, setNetIncome] = useState<string>("");
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>("");
  const [interestRate, setInterestRate] = useState<number>(14);
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
const [loanTerm, setLoanTerm] = useState<number>(20);

  const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculateAffordability = (): AffordabilityResult => {
    const monthlyGross = parseFloat(grossIncome) || 0;
    const monthlyNet = parseFloat(netIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const disposableIncome = monthlyNet - expenses;
    
    // Bank typically allows up to 30% of gross monthly income
    const maxRepayment = monthlyGross * 0.3;
    
    // Calculate maximum loan amount using the payment formula
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    const maxLoanAmount = maxRepayment * (1 - Math.pow(1 + monthlyRate, -numberOfPayments)) / monthlyRate;
    
    return {
      qualifyAmount: Math.min(maxLoanAmount, disposableIncome * 80 * 12),
      monthlyRepayment: maxRepayment
    };
  };

  const calculateAdditionalCosts = (loanAmount: number): CostsBreakdown => {
    const stampDuty = loanAmount * 0.03;
    const conveyancingFees = loanAmount * 0.04;
    const vat = conveyancingFees * 0.15;
    const sundries = 200;
    const bondRegistration = loanAmount * 0.04;
    const valuationFees = loanAmount * 0.01;
    const establishmentFees = loanAmount * 0.03;
    const applicationFees = 300;

    return {
      stampDuty,
      conveyancingFees,
      vat,
      sundries,
      bondRegistration,
      valuationFees,
      establishmentFees,
      applicationFees,
      total: stampDuty + conveyancingFees + vat + sundries + bondRegistration + 
             valuationFees + establishmentFees + applicationFees
    };
  };

  const handleNumericInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const affordability = calculateAffordability();
  const costs = calculateAdditionalCosts(affordability.qualifyAmount);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mb-8">
      <Tabs defaultValue="affordability" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          
          <TabsTrigger value="affordability" className="text-emerald-600">
            Affordability Calculator
          </TabsTrigger>
          <TabsTrigger value="bond" className="text-emerald-600">
            Bond Calculator
          </TabsTrigger>
          <TabsTrigger value="costs" className="text-emerald-600">
            Requirements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bond">
            <BondCalculator />
        </TabsContent>

        <TabsContent value="affordability">
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-700">Calculate how much you can afford to borrow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grossIncome">Gross Monthly Income (USD)</Label>
                  <div className="relative">
                    <Input
                      id="grossIncome"
                      type="text"
                      value={grossIncome}
                      onChange={(e) => handleNumericInput(e, setGrossIncome)}
                      className="pl-8 border-emerald-200 focus:border-emerald-500"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="netIncome">Net Monthly Income (USD)</Label>
                  <div className="relative">
                    <Input
                      id="netIncome"
                      type="text"
                      value={netIncome}
                      onChange={(e) => handleNumericInput(e, setNetIncome)}
                      className="pl-8 border-emerald-200 focus:border-emerald-500"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Monthly Expenses (USD)</Label>
                  <div className="relative">
                    <Input
                      id="monthlyExpenses"
                      type="text"
                      value={monthlyExpenses}
                      onChange={(e) => handleNumericInput(e, setMonthlyExpenses)}
                      className="pl-8 border-emerald-200 focus:border-emerald-500"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="border-emerald-200 focus:border-emerald-500"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-700">
                  Amount you qualify for:  <span className="text-lg font-semibold text-emerald-700">{formatUSD(affordability.qualifyAmount)}</span> 
                </div>
                <div className="text-gray-600">
                  Monthly Repayment: <span className="text-lg font-semibold text-emerald-700">{formatUSD(affordability.monthlyRepayment)}</span> 
                </div>
              </div>
            </CardContent>
            <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
            <CardTitle className="text-gray-700 py-4">Additional Costs</CardTitle>
                  <h3 className="font-semibold text-emerald-700">Estimated Costs Breakdown</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Stamp Duty (3%)</div>
                    <div className="text-right">{formatUSD(costs.stampDuty)}</div>
                    <div>Conveyancing Fees (4%)</div>
                    <div className="text-right">{formatUSD(costs.conveyancingFees)}</div>
                    <div>VAT (15% of conveyancing)</div>
                    <div className="text-right">{formatUSD(costs.vat)}</div>
                    <div>Sundries</div>
                    <div className="text-right">{formatUSD(costs.sundries)}</div>
                    <div>Bond Registration (4%)</div>
                    <div className="text-right">{formatUSD(costs.bondRegistration)}</div>
                    <div>Valuation Fees (up to 1%)</div>
                    <div className="text-right">{formatUSD(costs.valuationFees)}</div>
                    <div>Establishment Fees (3%)</div>
                    <div className="text-right">{formatUSD(costs.establishmentFees)}</div>
                    <div>Application Fees</div>
                    <div className="text-right">{formatUSD(costs.applicationFees)}</div>
                    <div className="font-semibold text-emerald-700 pt-2 border-t">Total Additional Costs</div>
                    <div className="text-right font-semibold text-emerald-700 pt-2 border-t">
                      {formatUSD(costs.total)}
                    </div>
                  </div>
                </div>

                <Alert className="bg-emerald-50 border-emerald-200">
                  <AlertDescription>
                    Note: These are estimated costs. Actual costs may vary based on specific circumstances and market conditions.
                  </AlertDescription>
                </Alert>
          </Card>
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
             
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="requirements">
                    <h1 className="text-emerald-600 py-4">Required Documents</h1>
                    {/* <AccordionContent>
                     
                    </AccordionContent> */}
                     <ul className="list-disc pl-6 space-y-2">
                        <li>Letter from employer confirming employment</li>
                        <li>3 months pay slips</li>
                        <li>6 months bank statements showing income</li>
                        <li>Copy of ID</li>
                        <li>Work permit or residence permit</li>
                        <li>Power of attorney</li>
                        <li>Copy of Agreement of Sale</li>
                        <li>Copy of title deeds</li>
                        <li>Approved plan (for building finance)</li>
                        <li>Non-refundable Application fees of {formatUSD(100)}</li>
                      </ul>
                  </AccordionItem>
                </Accordion>
                <Alert className="bg-emerald-50 border-emerald-200">
                  <AlertDescription>
                    Note: This is a rough guide. Actual requirements may vary based on specific circumstances, bank used and market conditions.
                  </AlertDescription>
                </Alert>
               
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calculators;
