import { Inter, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ShipmentProvider } from "@/contexts/ShipmentContext";
import { AuthProvider } from "@/contexts/AuthContext";
import localFont from "next/font/local";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

// Custom fonts from public folder
const sohne = localFont({
  src: [
    {
      path: "../../public/fonts/Sohne-Extraleicht.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-Leicht.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-Buch.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-Halbfett.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-Dreiviertelfett.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-Fett.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-Extrafett.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
  display: "swap",
});

const outfit = localFont({
  src: "../../public/fonts/Outfit-Regular.ttf",
  variable: "--font-outfit",
  display: "swap",
});

const robotoCondensed = localFont({
  src: "../../public/fonts/RobotoCondensed-Light.ttf",
  variable: "--font-roboto-condensed",
  display: "swap",
});

export const viewport = {
  themeColor: "#f59e0b", // Amber-500 color
};

export const metadata = {
  title: "iheartdogs - Find Your Perfect Companion",
  description:
    "Discover your perfect puppy from our curated selection of premium breeds. We offer healthy, well-socialized puppies from responsible breeders with health guarantees and ongoing support.",
  keywords:
    "puppies for sale, premium puppies, dog breeds, golden retriever, labrador, poodle, goldendoodle, puppy adoption, responsible breeders",
  openGraph: {
    title: "iheartdogs - Find Your Perfect Companion",
    description:
      "Discover your perfect puppy from our curated selection of premium breeds. Healthy, well-socialized puppies with health guarantees.",
    type: "website",
    locale: "en_US",
    url: "https://premiumpuppies.vercel.app",
    siteName: "iheartdogs",
    images: [
      {
        url: "/images/premium-puppies-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Premium puppies from various breeds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iheartdogs - Find Your Perfect Companion",
    description:
      "Discover your perfect puppy from our curated selection of premium breeds. Healthy, well-socialized puppies with health guarantees.",
    images: ["/images/premium-puppies-hero.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/pet_logo_t.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/pet_logo_t.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${sohne.variable} ${outfit.variable} ${robotoCondensed.variable}`}
    >
      <head>
        <link rel="icon" href="/logo_pd.png" type="image/png" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11314271675"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11314271675');
          `}
        </Script>

        {/* Theme color meta tag for mobile browsers */}
        <meta name="theme-color" content="#f59e0b" />

        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${sohne.className} font-sans`}>
        <AuthProvider>
          <ShipmentProvider>{children}</ShipmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
