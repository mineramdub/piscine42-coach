import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piscine42 Coach - Prépare ta Piscine 42",
  description: "Application web pour préparer les débutants à la Piscine 42",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
