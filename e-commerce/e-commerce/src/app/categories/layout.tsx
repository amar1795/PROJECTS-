
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Category",
  description: "Men's clothing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    
  return (
      <html lang="en" suppressHydrationWarning>
     
      <body  className={cn(
          "min-h-screen bg-background font-mono antialiased mx-[2rem] ",
          fontSans.variable
        )}>

           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
              
             {children}
             
            </ThemeProvider>
            
         
            </body>
            
            
    </html>
  );
}
