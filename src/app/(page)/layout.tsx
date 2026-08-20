import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";


export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
