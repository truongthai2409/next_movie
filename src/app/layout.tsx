import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import { TanStackProvider } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXT iMoVie",
  description:
    "NEXT iMoVie - Trang web xem phim trực tuyến miễn phí chất lượng cao với giao diện trực quan, tốc độ tải trang nhanh, cùng kho phim với hơn 10.000+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem lại phút giây giải trí tuyệt vời cho bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
