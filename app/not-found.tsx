import PageGradient from "@/components/custom/HeroGradient";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <div className="relative w-full h-auto lg:h-[645px] grid grid-cols-1 lg:grid-cols-2 gap-12 text-primary">
          <PageGradient />
          <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-6xl font-semibold">404</h1>
              <p className="text-xl font-semibold">Page not found</p>
              <p className="text-lg font-light">
                The page you are looking for does not exist.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
