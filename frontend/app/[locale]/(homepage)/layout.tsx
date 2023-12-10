import React from "react"
import Goal from "./components/goals"
import Dictionary from "@/components/dictionary"
import CreatePost from "./components/createpost"
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
      <div className="w-full flex flex-row gap-12 container" >
        <div className="basis-1/4" >
          <Goal />
        </div>
        <div className="basis-1/2 flex flex-col gap-8">
          <CreatePost />
          {children}
        </div>
        <div className="w-1/4 flex flex-col gap-4">
          <FlashCardCreate />
          <Dictionary />
        </div>
      </div>
    </div>
  )
}
