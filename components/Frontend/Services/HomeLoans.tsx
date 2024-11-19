import React from 'react';
import { Banknote, FileText, ClipboardCheck, Home } from 'lucide-react';

interface ProcessStepProps {
  icon: React.ElementType;
  text: string;
}

// interface ServiceProviderProps {
//   name: string;
//   interestRate: string;
//   logo: string;
// }

const ProcessStep: React.FC<ProcessStepProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-4">
    <div className="bg-emerald-50 p-4 rounded-full">
      <Icon className="w-6 h-6 text-emerald-500" />
    </div>
    <p className="text-slate-600">{text}</p>
  </div>
);

// const ServiceProvider: React.FC<ServiceProviderProps> = ({ name, interestRate, logo }) => (
//   <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
//     <div className="flex items-center justify-between">
//       <img src={`/${logo}`} alt={`${name} logo`} className="h-10" />
//       <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
//     </div>
//     <p className="mt-2 text-slate-500">Interest rate: <span className="font-semibold text-emerald-500">{interestRate}%</span></p>
//   </div>
// );

const HomeLoans: React.FC = () => {
  const processSteps = [
    { icon: FileText, text: "Submit your financial details" },
    { icon: ClipboardCheck, text: "Compare home loan options" },
    { icon: Banknote, text: "Choose the best loan for your needs" },
    { icon: Home, text: "Own your dream home" }
  ];

  // const providers = [
  //   { name: "CBZ Bank", interestRate: "12.5", logo: "cbz.png" },
  //   { name: "Stanbic Bank", interestRate: "10.8", logo: "stanbic.png" },
  //   { name: "ZB Bank", interestRate: "11.2", logo: "zb.png" }
  // ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Section - Process */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-slate-400 uppercase tracking-wide mb-2">PROCESS</h2>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">How it works</h3>
            <p className="text-slate-600">
              Find the best home loan options in Zimbabwe tailored to your needs.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} icon={step.icon} text={step.text} />
            ))}
          </div>

          {/* <div className="pt-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Top Home Loan Providers
            </h3>
            <div className="space-y-4">
              {providers.map((provider, index) => (
                <ServiceProvider
                  key={index}
                  name={provider.name}
                  interestRate={provider.interestRate}
                  logo={provider.logo}
                />
              ))}
            </div>
          </div> */}
        </div>

        {/* Right Section - Form */}
        <div className="bg-white rounded-lg p-8 shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Loan Application Details
          </h2>
          <form
            action="https://formsubmit.co/21d11afdc1d9cd42069c902545d8c9d8"
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_next"
              value="https://markethub.co.zw/services"
            />
            <input
              type="hidden"
              name="_subject"
              value="New Home Loan Request from Market Hub Zimbabwe"
            />

            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                name="income"
                placeholder="Monthly Income (USD)"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                name="loanAmount"
                placeholder="Desired Loan Amount (USD)"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <select
                name="loanType"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-600"
              >
                Type of loan
                <option value="">Loan Type</option>
                <option value="newPurchase">New Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="switchBanks">Switch Banks</option>
              </select>
            </div>
            <div>
              <select
                name="loanTerm"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-600"
              >
                <option value="">Loan Term</option>
                <option value="5">5 Years</option>
                <option value="10">10 Years</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
            >
              Request quotes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeLoans;
