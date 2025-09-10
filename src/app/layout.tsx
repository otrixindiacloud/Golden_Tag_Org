import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { OTPProvider } from "../contexts/OTPContext";
import { TranslationProvider } from "../contexts/TranslationContext";

import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import SecondaryHeader from "../components/SecondaryHeader";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Golden Tag",
    absolute: "Golden Tag - Premium Corporate Gifts & Giveaways in Bahrain",
  },
  description: "Premium corporate gifts and giveaways in Bahrain. Serving leading multinational companies since 2015. Contact us at +973 3663 0814 or Info@goldentag.com.bh",
  keywords: "corporate gifts, Bahrain, Manama, giveaways, promotional items, branded gifts, business gifts, golden tag",
  authors: [{ name: "Golden Tag" }],
  creator: "Golden Tag",
  publisher: "Golden Tag",
  openGraph: {
    title: "Golden Tag - Premium Corporate Gifts & Giveaways in Bahrain",
    description: "Premium corporate gifts and giveaways in Bahrain. Serving leading multinational companies since 2015.",
    url: "https://www.goldentag.com.bh",
    siteName: 'Golden Tag',
    images: [],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Tag - Premium Corporate Gifts & Giveaways in Bahrain",
    description: "Premium corporate gifts and giveaways in Bahrain. Serving leading multinational companies since 2015.",
    images: [],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.goldentag.com.bh'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#DAA520' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <TranslationProvider>
          <ThemeProvider>
            <AuthProvider>
              <OTPProvider>
                <NotificationProvider>
                  <CartProvider>
                    <WishlistProvider>
                      <TopHeader />
                      <Header />
                      <SecondaryHeader />
                      {children}
                      <Footer />
                    </WishlistProvider>
                  </CartProvider>
                </NotificationProvider>
              </OTPProvider>
            </AuthProvider>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
