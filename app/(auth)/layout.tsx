"use client";
import PageGradient from "@/components/custom/HeroGradient";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Suspense>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="relative w-full h-auto lg:h-[645px] grid grid-cols-1 lg:grid-cols-3 gap-12 text-primary">
            <PageGradient />
            {children}
          </div>
        </main>
        <Footer />
      </Suspense>
    </QueryClientProvider>
  );
}
