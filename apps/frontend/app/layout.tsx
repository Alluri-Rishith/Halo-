import "./globals.css";
import type { Metadata } from "next";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "SwasthyaVault",
  description: "Secure health vault and medical report explainer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
