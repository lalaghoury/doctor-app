import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/Navbar/Navbar";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import { Info } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Doctory | Online doctor appointments",
  description: "An online doctor appointment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <div className="absolute h-full bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
              {/* <Navbar /> */}
              {children}

              <Toaster
                position="top-center"
                icons={{
                  success: "✅",
                  error: "❌",
                  info: "📝",
                  warning: "⚠️",
                  loading: "⏳",
                }}
              />
            </div>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
