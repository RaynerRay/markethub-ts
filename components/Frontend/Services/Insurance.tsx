import React from 'react';
import { ShieldCheck, FileText, ClipboardCheck, Home } from 'lucide-react';

interface ProcessStepProps {
  icon: React.ElementType;
  text: string;
}

// interface ServiceProviderProps {
//   name: string;
//   price: string;
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

// const ServiceProvider: React.FC<ServiceProviderProps> = ({ name, price, logo }) => (
//   <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
//     <div className="flex items-center justify-between">
//       <img src={`/${logo}`} alt={`${name} logo`} className="h-10" />
//       <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
//     </div>
//   </div>
// );

const Insurance: React.FC = () => {
  const processSteps = [
    { icon: FileText, text: "Provide your home details" },
    { icon: ClipboardCheck, text: "Receive competitive insurance quotes" },
    { icon: ShieldCheck, text: "Choose the best policy for your needs" },
    { icon: Home, text: "Get your home insured hassle-free" }
  ];

  // const providers = [
  //   { name: "ZimCover Insurance", price: "Starting from $150/year", logo: "zimcover.png" },
  //   { name: "SafeHome Insurance", price: "Affordable rates", logo: "safehome.png" }
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
              Protect your home with comprehensive insurance coverage.
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <ProcessStep key={index} icon={step.icon} text={step.text} />
            ))}
          </div>

          {/* <div className="pt-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Trusted Home Insurance Providers
            </h3>
            <div className="space-y-4">
              {providers.map((provider, index) => (
                <ServiceProvider
                  key={index}
                  name={provider.name}
                  price={provider.price}
                  logo={provider.logo}
                />
              ))}
            </div>
          </div> */}
        </div>

        {/* Right Section - Form */}
        <div className="bg-white rounded-lg p-8 shadow-sm h-fit">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Home Details
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
              value="New Home Insurance Request from Market Hub Zimbabwe"
            />

            <div>
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                name="coverageAmount"
                placeholder="Desired Coverage Amount"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <select
                name="homeType"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-600"
              >
                <option value="">Use of Home</option>
                <option value="primaryResidence">Primary Residence</option>
                <option value="secondaryResidence">Secondary Residence</option>
                <option value="investmentHome">Investment or Rental home</option>
              </select>
            </div>
            




            <div>
              <select
                name="insuranceType"
                required
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-600"
              >
                <option value="">Insurance Type</option>
                <option value="buildingCover">Building cover</option>
                <option value="householdContents">Household contents</option>
                <option value="burglaryCover">Burglary cover</option>
                <option value="domesticHelpCover">Domestic help cover</option>
              </select>
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
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
            >
              Get Quotes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
