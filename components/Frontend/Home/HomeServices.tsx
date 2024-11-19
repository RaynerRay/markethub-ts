import React from 'react';
import { Home, User,FileText, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const HomeServices = () => {
  const navItems = [
    {
      icon: Home,
      title: "Home Services",
      subtitle: "Home valuations, Insurance, Loans & more",
      link:"/services"
    },
    {
      icon: User,
      title: "Local Agents",
      subtitle: "Connect with our verified estate agents",
      link:"/companies"
    },
    {
      icon: FileText,
      title: "News and Blogs",
      subtitle: "Stay informed",
      link:"/blogs"
    },
    // {
    //   icon: FileText,
    //   title: "Latest Updates",
    //   subtitle: "Stay informed"
    // },
    {
      icon: TrendingUp,
      title: "See Market Trends",
      subtitle: "View analytics",
      link:"/analytics"
    }
  ];

  return (
    <div className="w-full px-4 py-20 bg-sky-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-20 text-center">
        Also Check Out
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            <Link href={item.link}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors duration-300">
                <item.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.subtitle}
                </p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeServices;