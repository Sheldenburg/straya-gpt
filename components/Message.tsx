"use client"

import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    // bg-[#F7F7F8]
    <div className={`${ !isChatGPT && "py-5 text-black bg-[#F7F7F8]"} ${isChatGPT && "py-5 text-black bg-white"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} className="h-8 w-8" />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
