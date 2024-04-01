import React from "react"
import Goal from "./components/goals"
import Dictionary from "@/components/dictionary"
import FlashCardCreate from "@/components/flashcardcreate"
import Header from "@/components/header";
import ChatWithGemini from "@/components/geminiAI";
import ChatWithAnother from "@/components/chat-realtime";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="w-full flex flex-col mb-10">
      <Header />
      <div className="w-full flex flex-row gap-12 container h-full mt-5">
        <div className="w-1/4 h-full sticky top-[100px]">
          <Goal />
        </div>
        <div className="w-1/2 flex flex-col gap-8">
          {children}
        </div>
        <div className="w-1/4 h-full sticky top-[100px]">
          <div className="scrollbar overflow-auto flex flex-col gap-4 max-h-[80vh]">
            <FlashCardCreate />
            <ChatWithGemini />
            <ChatWithAnother />
            <Dictionary />
          </div>
        </div>
      </div>
    </div>
  )
}
