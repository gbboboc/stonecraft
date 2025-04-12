import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { BodyAttributes } from "./components/BodyAttributes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELITPETRA",
  description:
    "Artă premium în piatră și meșteșug pentru monumente și sculpturi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BodyAttributes />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
