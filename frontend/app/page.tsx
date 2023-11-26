"use client"

import { useAppSelector } from "./redux/store"

export default function Home() {
  const userinfor = useAppSelector(state=>state.auth.userinfor)
  console.log(userinfor)
  return (
    <>
      <div>Home</div>
    </>
  )
}
