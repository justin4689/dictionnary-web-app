import type { Metadata } from "next";
import { Montserrat} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./providers";

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
        className={`${montserrat.className} antialiased  `}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Header/>
            <main className="container">{children}</main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
