import { Footer, Header } from "@/components";
import { NextIntlClientProvider } from "next-intl";

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
