import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ParentProvider from "./ParentProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wagr",
  description: "Development Instance of Wagr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentProvider>{children}</ParentProvider>
      </body>
    </html>
  );
}
