import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";
import Footer from "@/components/Footer";

const montserrat= Montserrat({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "WordBase | Dictionnary app",
  description: "An online dictionary web app for searching, learning, and understanding words with clear definitions and examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Header/>
            <main className="container flex-1">{children}</main>
            <Footer/>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
