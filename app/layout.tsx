import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { SessionProviders } from "@/components/SessionProvider";
import TokenRefresher from "@/components/auth/TokenRefresher";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BookVerse — Đọc sách trực tuyến",
    template: "%s | BookVerse",
  },
  description:
    "Khám phá hàng triệu cuốn sách từ khắp nơi trên thế giới. Đọc, tìm kiếm và quản lý thư viện sách cá nhân của bạn.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={cn("h-full antialiased", inter.variable, merriweather.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <SessionProviders>
          {/* Proactive token refresh + redirect on RefreshTokenError */}
          <TokenRefresher />
          <Providers>
            <Navbar />
            <Breadcrumbs />
            <div className="flex-1">{children}</div>
          </Providers>
        </SessionProviders>
      </body>
    </html>
  );
}
