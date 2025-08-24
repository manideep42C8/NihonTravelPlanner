import type React from "react"
import { Geist, Manrope } from "next/font/google"
import { GoogleOAuthProvider } from "@react-oauth/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata = {
  title: "Discover Japan - Your Gateway to Japanese Culture",
  description:
    "Explore the beauty of Japan through our comprehensive travel guide featuring destinations, culture, and stunning photography.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
