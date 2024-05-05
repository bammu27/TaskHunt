import type { Metadata } from "next";
import "./globals.css";
import {roboto} from '../lib/font'



export const metadata: Metadata = {
  title: "TaskManager",
  description: "Be productive ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} >{children}</body>
    </html>
  );
}
