import React from 'react';
import { Home, Banknote, HandshakeIcon, LineChart, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, link }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
    <div className="mb-4">
      <Icon className="w-8 h-8 text-emerald-500" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm mb-4">{description}</p>
    <button className="text-emerald-500 flex items-center text-sm font-medium hover:text-emerald-600 transition-colors">
      <Link href={`${link}`}>Click here</Link>
      <ChevronRight className="w-4 h-4 ml-1" />
    </button>
  </div>
);

const ServicesList: React.FC = () => {
  const services = [
    {
      icon: Home,
      title: "Bond Calculators",
      description: "Affordability calculator, bond calcualtor and requirements",
      link: "/calculators"
    },
    {
      icon: Banknote,
      title: "Home Loan",
      description: "The smarter way for home financing with competitive rates in Zimbabwe",
      link: "services/home-loans"
    },
    {
      icon: HandshakeIcon,
      title: "Home Insurance",
      description: "Get comprehensive property insurance coverage in Zimbabwe",
      link: "services/insurance"
    },
    {
      icon: LineChart,
      title: "Property Valuations",
      description: "Professional property valuation services in Zimbabwe",
      link: "services/valuations"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-slate-50">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-slate-800 leading-tight">
            Your home needs <br />under one roof
          </h1>
          <p className="text-slate-600">
            Ensuring a one-stop experience for all your home service requirements
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image height={500} width={500} src="/office.jpg" alt="Home furniture illustration" className="max-w-md rounded-md" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            link={service.link}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          How does this work?
        </h2>
        <div className="space-y-4 text-slate-600">
          <p>
            Looking for trusted home services? We have partnered with top service providers to offer hassle-free solutions for all your property-related needs.
          </p>
          <p>
            Skip the frustration of searching for individual companies online. Simply select the service you need, fill out our quick inquiry form, and receive up to 3 competitive quotes from verified providers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;