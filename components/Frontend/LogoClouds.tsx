import Image from "next/image";
import Link from "next/link";

export default function LogoClouds() {
  const partners = [
    { src: "/seef.jpg", link: "seef-zimbabwe" },
    { src: "/pam.jpg", link: "pam-golding" },
    { src: "/kennan.jpg", link: "kennan-properties" },
    { src: "/royal.jpg", link: "royal-properties" },
    { src: "/cardinal.jpg", link: "cardinal-properties" },
  ];

  return (
    <section className="py-20 xl:pt-24 bg-white mx-auto max-w-7xl">
      <div className="container px-4 mx-auto">
        <div className="mb-8 text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-emerald-500 bg-emerald-100 font-medium uppercase rounded-full">
            Trusted Partners
          </span>
          <h3 className="mb-4 text-2xl md:text-3xl text-gray-900 font-bold tracking-tighter">
            Partnered with industry-leading real estate firms
          </h3>
          <p className="text-md md:text-lg text-gray-500 font-medium">
            Our marketplace is trusted by top companies, bringing you a reliable
            and seamless real estate experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-1/2 md:w-1/3 lg:w-1/5 px-4 mb-8 lg:mb-0"
            >
              <div className="flex items-center justify-center h-32 md:h-36 px-4 md:px-8 rounded-md bg-gray-50 shadow-md">
                <Link href={`/companies/${partner.link}`}>
                  <Image
                    className="mx-auto h-16 w-24"
                    src={partner.src}
                    alt=""
                    width={100}
                    height={40}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
