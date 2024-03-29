import React from "react"
import Header from "@/components/header";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="w-full flex flex-col mb-10">
      <Header />
      {children}
    </div>
  )
}
