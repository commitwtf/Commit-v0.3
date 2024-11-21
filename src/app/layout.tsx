import type { Metadata } from "next";
import "@/src/assets/css/globals.css";

export const metadata: Metadata = {
  title: "Commit",
  description: "Onchain accountability protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
