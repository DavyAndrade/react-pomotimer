import { Container } from "../ui";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Container
      size="md"
      as="div"
      className="px-6 lg:px-0 min-h-screen flex flex-col"
    >
      <Header />

      <main className="w-full text-white flex flex-col gap-4 py-16 flex-1">
        {children}
      </main>

      <Footer />
    </Container>
  );
}
