import React from 'react'

const CompaniesFilter = ({ companies }: { companies: { id: string; name: string; logo: string; propertiesCount: number }[] }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Featured Companies</h3>
      <div className="space-y-4">
        {companies.map((company) => (
          <div key={company.id} className="flex items-center space-x-3">
            <img src={company.logo || "/api/placeholder/40/40"} alt={company.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="text-slate-800 font-medium">{company.name}</h4>
              <p className="text-slate-600 text-sm">{company.propertiesCount} Properties</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompaniesFilter


