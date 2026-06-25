import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitatie de date cica",
  description: "auzi tu nu mi accepta daca stia ca sunt din braila",
  openGraph: {
    title: "Invitatie de date cica",
    description: "auzi tu nu mi accepta daca stia ca sunt din braila",
  },
  twitter: {
    title: "Invitatie de date cica",
    description: "auzi tu nu mi accepta daca stia ca sunt din braila",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
