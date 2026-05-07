import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexora",
  description: "Civic Issue Resolution Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hardcoded to 'en' for now, but in production, this would dynamically check the user's chosen locale
  const locale = 'en'; 
  
  return (
    <html lang={locale} dir={['ar', 'ur'].includes(locale) ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}