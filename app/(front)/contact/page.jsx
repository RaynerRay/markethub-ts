import React from 'react';
import { Home, ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/x'
import 'react-social-icons/tiktok'

const page = () => {
  return (
    <div>
      <div id="page-banner-area" className="page-banner bg-emerald-500 text-white py-12">
        <div className="page-banner-title text-center">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <Link href={"/"} className="flex items-center justify-center my-4">
            <Home className="mr-1" />
            Home
          </Link>
          <div className="flex items-center justify-center mt-1">
            <ChevronRight />
            <span className="current ml-1">Contact Us</span>
          </div>
        </div>
      </div>

      <section id="contact-section" className="section-padding py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-7/12 md:w-6/12 px-4">
              <div className="contact-right-area">
                <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
                <p className="mb-6">
                  If you are interested in working with us, <br /> please get in touch.
                </p>
                <div className="contact-right">
                  <div className="single-contact flex items-center mb-4">
                    <MapPin className="text-gray-50 mr-4  bg-emerald-500 p-1" />
                    <p>61 Prices Avenue, Mt Pleasant, Harare, Zimbabwe</p>
                  </div>
                  <div className="single-contact flex items-center mb-4">
                    <Mail className="text-gray-50 mr-4  bg-emerald-500 p-1" />
                    <p><a href="mailto:Feedback@property.com">info@markethub.co.zw</a></p>
                  </div>
                  <div className="single-contact flex items-center mb-4">
                    <Phone className="text-gray-50 mr-4  bg-emerald-500 p-1" />
                    <p><a href="tel:+1234567478">+263-774-340-505</a></p>
                  </div>
                </div>
                {/* <div className="social-icon flex space-x-4 mt-6">
                  <a className="facebook" href="#"><Facebook /></a>
                  <a className="twitter" href="#"><X/> </a>
                  <a className="instagram" href="#"><Instagram /></a>
                  <a className="linkedin" href="#"><Linkedin /></a>
                </div> */}
              </div>
            </div>
            <div className="w-full lg:w-4/12 md:w-6/12 px-4">
              <h2 className="text-2xl font-bold mb-4">Social Media </h2>
              {/* <form role="form" method="post" id="contactForm" name="contact-form">
                <div className="form-group mb-4">
                  <input
                    type="text"
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="tel"
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg"
                    id="msg_subject"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <textarea
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows="5"
                    id="message"
                    name="message"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="form-submit">
                  <button type="submit" className="btn bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg py-2 px-4 flex items-center">
                    <i className="fa fa-paper-plane mr-2" aria-hidden="true"></i> Send Message
                  </button>
                  <div id="msgSubmit" className="h3 text-center hidden"></div>
                </div>
              </form> */}
                <div className="social-icon flex space-x-4 mt-6">
                <SocialIcon url="https://x.com/MarketHub_Zim" target="_blank" />
                <SocialIcon url="https://www.tiktok.com/@markethubzim" target="_blank" />
                  {/* <Link className="facebook" href="#" target="_blank">
                    <SocialIcon url="www.facebook.com" />
                  </Link>
                  <Link className="x font-bold text-black" href="https://x.com/MarketHub_Zim" target="_blank">
                  
                  </Link>
                  <Link className="instagram" href="#" target="_blank">
                  <SocialIcon url="www.instagram.com" />
                  </Link>
                  <Link className="tiktok" href="#" target="_blank">
                  <SocialIcon url="www.tiktok.com" />
                  </Link> */}
                </div>
            </div>
          </div>
        </div>
      </section>

      

   

     
    </div>
  );
};

export default page;
