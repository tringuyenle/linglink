import React from "react"
import Goal from "./components/goals"
import Dictionary from "@/components/dictionary"
import FlashCardCreate from "@/components/flashcardcreate"
import Header from "@/components/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="w-full flex flex-col mb-10">
      <Header />
      <div className="w-full flex flex-row gap-12 container h-full">
        <div className="w-1/4 h-full sticky top-[100px]">
          <Goal />
        </div>
        <div className="w-1/2 flex flex-col gap-8">
          {children}
        </div>
        <div className="w-1/4 h-full sticky top-[100px] overflow-y-auto">
          <div className="overflow-auto flex flex-col gap-4 max-h-screen">
            <FlashCardCreate />
            <Dictionary />
          </div>
        </div>
      </div>
    </div>
  )
}
