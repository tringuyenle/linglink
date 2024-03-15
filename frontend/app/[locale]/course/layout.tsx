"use client"

import React from "react"
import Header from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function FlashcardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full flex flex-col mb-10">
        <Header />
        {children}
      </div>
    </QueryClientProvider>
  )
}
