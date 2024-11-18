import React from 'react'

const page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white">
    <header className="border-b pb-4">
      <h1 className="text-3xl font-bold text-gray-900">MarketHub Privacy Policy</h1>
      <div className="mt-4 p-4 bg-emerald-50 rounded-lg text-emerald-700">
        We respect your privacy. Callouts like this are a summary of our privacy policy and contain the most important and relevant points for you. Please read the full privacy policy because it applies to you.
      </div>
    </header>

    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">1. Introduction</h2>
        <div className="mt-3 space-y-3 text-gray-600">
          <p>Welcome to our privacy policy. We respect your privacy and take the protection of personal information very seriously. We understand that your trust is our most important asset.</p>
          <p>MarketHub is owned and operated by MarketHub Zimbabwe (Pvt) Ltd.</p>
          <div className="space-y-1">
            {/* <div>Company registration number: [Company Registration Number]</div> */}
            <div>Registered address: 61 Prices Avenue, Mt Pleasant, Harare, Zimbabwe</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">2. Audience</h2>
        <div className="mt-3 space-y-2 text-gray-600">
          <p>This policy applies to you if you are:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>A visitor to our website, mobile site, applications </li>
            <li>A customer who has ordered a product, or requested a service that we provide</li>
            <li>An estate agency making use of our services</li>
            <li>Anyone contacting us by phone, SMS, email, in letters and other correspondence, and in person</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">3. Personal Information</h2>
        <div className="mt-3 space-y-4 text-gray-600">
          <div>
            <p className="font-medium mb-2">Personal information includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Certain information that we collect automatically when you visit our website</li>
              <li>Certain information collected on registration</li>
              <li>Certain information collected on submission</li>
              <li>Optional information that you provide to us voluntarily</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">But excludes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Information that has been made anonymous</li>
              <li>Permanently de-identified information</li>
              <li>Non-personal statistical information</li>
              <li>Information provided in public forums</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">4. Acceptance</h2>
        <div className="mt-3 space-y-4 text-gray-600">
          <div>
            <h3 className="text-xl font-medium text-gray-700">4.1 Acceptance Required</h3>
            <p className="mt-2">You must accept all the terms of this policy when you access the website to order a product or request our services.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-700">4.2 Legal Capacity</h3>
            <p className="mt-2">You may not access our website or order a product or request our services if you are younger than 18 years old, or do not have legal capacity to conclude legally binding contracts.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">5. Collection</h2>
        <div className="mt-3 space-y-4 text-gray-600">
          <div>
            <h3 className="text-xl font-medium text-gray-700">5.1 Registration Information Required</h3>
            <p className="mt-2">When you register, you will need to provide:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Your first name and surname</li>
              <li>Your email address</li>
              <li>Your telephone number</li>
              <li>Your password</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-700">5.2 Property Listings</h3>
            <p className="mt-2">To place a listing, you must provide:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Your province, city, suburb</li>
              <li>Your street address</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800">6. Web Analytics & Communications</h2>
        <div className="mt-3 space-y-4 text-gray-600">
          <div>
            <h3 className="text-xl font-medium text-gray-700">6.1 Web Analytics</h3>
            <p className="mt-2">We use web analytics tools to improve our website functionality and user experience. All data collected through these methods is processed in a de-identified and anonymized manner.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-700">6.2 Communications</h3>
            <p className="mt-2">All telephone calls to our customer service are recorded. When communicating with us, you may need to provide personal information to help resolve your query or complaint.</p>
          </div>
        </div>
      </div>
    </section>

    <footer className="mt-8 pt-4 border-t text-sm text-gray-500">
      <p>All collected information is used in accordance with Zimbabwean data protection laws and regulations.</p>
    </footer>
  </div>
  )
}

export default page