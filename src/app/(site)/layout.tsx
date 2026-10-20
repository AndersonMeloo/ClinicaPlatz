import { Header } from "@/components/client/Header";
import { Footer } from "@/components/sections/Footer";

/** Header e rodapé compartilhados por todas as páginas do site. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
