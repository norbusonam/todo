import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Taskbrew",
  description: "Taskbrew is a task management app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* this dark mode only really works well w/  shades, fix later */}
      <body className="dark:bg-black dark:invert">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
