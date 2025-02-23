"use client";
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
        <main>
          <div className="min-h-screen flex items-center justify-center bg-muted p-4">
            {children}
          </div>
        </main>
      </Suspense>
    </QueryClientProvider>
  );
}
