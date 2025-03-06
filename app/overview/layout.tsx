"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { AuthContextProvider } from "@/hooks/AuthContext";
import AppSidebar from "@/components/sections/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Footer from "@/components/sections/Footer";
import OverviewHeader from "@/components/sections/OverviewHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <NuqsAdapter>
        <Suspense>
          <AuthContextProvider enforceLogin>
            <main className="static">
              <OverviewHeader />
              <div className="relative flex">
                <SidebarProvider>
                  <SidebarTrigger className="absolute inset-2 z-10 size-12" />
                  <AppSidebar />
                  <div className="w-full h-full">{children}</div>
                </SidebarProvider>
              </div>
              <Footer />
            </main>
          </AuthContextProvider>
        </Suspense>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
