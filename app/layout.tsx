import type { Metadata } from "next";
import "./globals.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ko";
import Logo from "@/components/image/Logo";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

export const metadata: Metadata = {
  title: "동탄연세맑은내과 투석실 관리페이지",
  description: "투석실",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Logo />

        <main className="desktop">{children}</main>
      </body>
    </html>
  );
}
