import { Message, User, UserData } from "@/app/constants/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect } from "react";
import { getSocket } from "@/app/services/socketService";
import { useAppSelector } from "@/app/redux/store";

interface ChatProps {
  messages?: Message[];
  selectedUser: User;
  isMobile: boolean;
  chatRoomId: string;
}

export function Chat({ messages, selectedUser, isMobile, chatRoomId }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const user = useAppSelector(state => state.auth.userinfor)
  const sk = getSocket();

  useEffect(() => {
    sk.on('getmessage', (newMessage) => {
      if (newMessage.chatRoomId == chatRoomId) 
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up listener when component unmounts
    return () => {
      sk.off('getmessage');
    };
  }, [sk]);

  const sendMessage = (newMessage: Message) => {
    sk.emit('chat', {content: newMessage.content, chatRoomId: chatRoomId, imgs_url: newMessage.imgs_url, from: newMessage.from});
  };

  return (
    <div className="flex flex-col justify-between w-full h-fit max-h-[600px]">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
