"use client";

import { Room, userData } from "@/app/constants/data";
import React, { useEffect, useState } from "react";
import { Chat } from "./chat";

export const ChatLayout: React.FC<Room> = ({ chatRoomId, name, participant, friends }) => {
  const [selectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className="scroll-auto">
      <Chat
        messages={selectedUser.messages}
        selectedUser={friends}
        isMobile={isMobile}
      />
    </div>
  );
}
