import React from "react"
import Goal from "./components/goals"
import Dictionary from "@/components/dictionary"
import FlashCardCreate from "@/components/flashcardcreate"
import Header from "@/components/header";
import ChatWithGemini from "@/components/geminiAI";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="w-full flex flex-col mb-10">
      <Header />
      <div className="w-full flex flex-row gap-12 container" >
        <div className="w-1/4" >
          <Goal />
        </div>
        <div className="w-1/2 flex flex-col gap-8">
          {children}
        </div>
        <div className="w-1/4 flex flex-col gap-4">
          <FlashCardCreate />
          <Dictionary />
          <ChatWithGemini/>
        </div>
      </div>
    </div>
  )
}
