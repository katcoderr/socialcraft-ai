import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/craft/craft.css"
import { ThemeProvider } from "@/components/theme-provider";
import { NavBar } from "@/components/Navbar";
import { ClerkProvider} from '@clerk/nextjs'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "socialcraft.",
  description: "Generate social media content with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar/>
            {children}
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
