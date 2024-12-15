import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://markethub.co.zw'), // Replace with your actual domain
  icons: {
    icon: "/favicon.png",
  },
  title: {
    default: "MarketHub Zimbabwe | Premier Real Estate Marketplace",
    template: "%s | MarketHub Zimbabwe"
  },
  description: "Zimbabwe's leading real estate marketplace. Find properties for sale and rent in Harare, Bulawayo, Mutare and across Zimbabwe. Houses, apartments, land and commercial properties.",
  keywords: [
    "Zimbabwe real estate",
    "property for sale Zimbabwe",
    "houses for rent Harare",
    "commercial property Zimbabwe",
    "land for sale Zimbabwe",
    "real estate agents Zimbabwe",
    "Harare properties",
    "Bulawayo real estate",
    "Masvingo real estate",
    "Zimbabwe property market",
    "buy house Zimbabwe"
  ],
  authors: [{ name: "MarketHub Zimbabwe" }],
  creator: "MarketHub Zimbabwe",
  publisher: "MarketHub Zimbabwe",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  category: 'Real Estate',
  
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: "https://markethub.co.zw",
    siteName: "MarketHub Zimbabwe",
    title: "MarketHub Zimbabwe | Premier Real Estate Marketplace",
    description: "Zimbabwe's leading real estate marketplace. Find properties for sale and rent in Harare, Bulawayo, Mutare and across Zimbabwe.",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "MarketHub Zimbabwe Real Estate Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MarketHub Zimbabwe | Premier Real Estate Marketplace",
    description: "Zimbabwe's leading real estate marketplace. Find properties across Zimbabwe.",
    images: ["/logo.png"],
    creator: "@MarketHub_Zim",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  alternates: {
    canonical: "https://markethub.co.zw",
    languages: {
      'en-ZW': 'https://markethub.co.zw',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
      <Providers>
      
        {children}
      
        </Providers>
      </body>
    </html>
  );
}