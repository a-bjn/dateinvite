import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O invitație specială 🌸",
  description: "Ceva frumos, doar pentru tine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
