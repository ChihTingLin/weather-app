import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather forecasting & statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800`}
      >
        <header className="px-6 py-4 border-b border-gray-500 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold">
            W
          </Link>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/weather/weekly">一週氣溫預報</Link>
              </li>
              <li>
                <Link href="/weather/rainfall">降雨預報</Link>
              </li>
              {/* <li>全國空氣品質</li>
              <li>全國紫外線指數</li>
              <li>氣候統計</li> */}
            </ul>
          </nav>
        </header>
        <div className="min-h-screen lg:max-w-[800px] lg:mx-auto p-5">
          {children}
        </div>
      </body>
    </html>
  );
}
