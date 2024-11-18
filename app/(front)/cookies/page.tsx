import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-700">MarketHub Cookie Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Purpose Section */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-600">Purpose</h2>
            <p className="text-gray-700">
              The purpose of this policy is to describe what cookies are, what we use them for, and how you can manage them during your visit to our website.
            </p>
          </section>

          {/* What are cookies Section */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-emerald-600">What are cookies?</h2>
            <p className="text-gray-700">
              Cookies are small files that may be placed on your device when you visit a website. For more information about cookies, see{" "}
              <a 
                href="https://allaboutcookies.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-600 hover:text-emerald-700 inline-flex items-center"
              >
                All About Cookies
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </p>
          </section>

          {/* What are cookies used for Section */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-emerald-600">What are cookies used for?</h2>
            <p className="text-gray-700">
              Internet cookies are commonplace and do not harm your device - they just store or gather website information. They help enhance your online experience, like remembering login details so you don't have to re-enter them when revisiting a website.
            </p>
          </section>

          {/* Types of cookies Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-emerald-600">Types of cookies</h2>
            
            <div className="bg-emerald-50 p-4 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">Main Types:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><span className="font-medium">Persistent cookies</span> - these cookies are stored in the browser of your device and are used whenever you visit a website;</li>
                  <li><span className="font-medium">Session cookies</span> - these are temporary cookies that remain in the cookies archive of your browser until you leave a website;</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">Further Classification:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><span className="font-medium">1st party</span> - cookies are set directly by the website (or domain) you visit</li>
                  <li><span className="font-medium">3rd party</span> - cookies are set by a website other than the one you are currently on</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What cookies do we use Section */}
          <Accordion type="single" collapsible className="bg-white">
            <AccordionItem value="cookies-we-use">
              <AccordionTrigger className="text-xl font-semibold text-emerald-600">
                What cookies do we use?
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cookies that are essential to make our website function and to enable you to use all its features;</li>
                  <li>We use cookies to temporarily store input information in our tools and forms to improve your experience on our website;</li>
                  <li>We use cookies to count visitors to our website and where they most like to go on the website. This helps us improve the overall functionality of the website;</li>
                  <li>We use 3rd party cookies to advertise on our website. No personal information is shared with any 3rd party to display these adverts i.e. we do not make use of remarketing services.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Third-party links Section */}
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-emerald-600">Links to third-party websites</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites or applications, including those of our partners. Please note those third-party websites may also use cookies. We do not control those third-party websites and are not responsible for the cookies they set or access. If you click on one of these links or apps, please note that each one will have its own cookies policy. Therefore, please read the cookies policy of other websites before using them.
            </p>
          </section>

          {/* Updates Section */}
          <Alert className="bg-emerald-50 border-emerald-200">
            <AlertDescription>
              <h2 className="font-semibold text-emerald-700 mb-2">Updates to this policy</h2>
              <p className="text-gray-700">
                We may occasionally make changes to this policy. When we make material changes to this policy, we will inform you by placing a notice on this website.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookiePolicy;