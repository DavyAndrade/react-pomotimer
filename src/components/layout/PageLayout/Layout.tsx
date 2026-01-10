import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <main className="w-full bg-gray-800 text-white flex flex-col py-16 items-center px-4">
        <div className="flex flex-col justify-center items-center w-full gap-4 md:max-w-3xl">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
