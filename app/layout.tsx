import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Vextor — Enterprise Software for Bharat's SMEs",
  description:
    "Enterprise-grade software at SME-friendly prices. Powering your growth to achieve Vikshit Bharat by 2047.",
  keywords: "SME software, India, digital transformation, workflow automation, 2047",
  openGraph: {
    title: "Vextor — Tech Direction of a Developed India",
    description: "Enterprise-grade software at SME-friendly prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
