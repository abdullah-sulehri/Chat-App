import React, { useEffect } from 'react'
import { useRef } from "react";
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {messages,getMessages,isMessageLoading,selectedUser}=useChatStore();
   const { authUser } = useAuthStore();
   const messageEndRef = useRef(null);
  if(isMessageLoading ){
    return <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  }
  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="relative mx-auto lg:mx-0 w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput/>

    </div>
  )
}

export default ChatContainer
