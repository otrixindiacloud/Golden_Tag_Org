import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider } from "../contexts/AuthContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { OTPProvider } from "../contexts/OTPContext";

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
    images: [
      {
        url: "/golden-tag-logo.svg",
        width: 1200,
        height: 630,
        alt: 'Golden Tag Logo',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Tag - Premium Corporate Gifts & Giveaways in Bahrain",
    description: "Premium corporate gifts and giveaways in Bahrain. Serving leading multinational companies since 2015.",
    images: ["/golden-tag-logo.svg"],
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
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <OTPProvider>
              <NotificationProvider>
                <CartProvider>
                  <WishlistProvider>
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
      </body>
    </html>
  );
}
