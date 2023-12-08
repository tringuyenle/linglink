import Header from "@/components/header"
import React from "react"
export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="w-full flex flex-col mb-10" >
      <Header />
      <div className="container">
        {children}
      </div>
    </div>
  )
}
