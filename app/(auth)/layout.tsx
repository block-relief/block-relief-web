"use client";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { AuthContextProvider } from "@/hooks/AuthContext";
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
        <AuthContextProvider>
          <Header />
          <main className="min-h-screen flex items-center justify-center">
            <div className="w-full h-auto bg-noisyGradient lg:h-[645px] grid grid-cols-1 lg:grid-cols-3 gap-12 text-primary">
              {children}
            </div>
          </main>
          <Footer />
        </AuthContextProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
