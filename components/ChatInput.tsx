"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { db } from "@/firebase"
import { toast } from "react-hot-toast"

type Props = {
  chatId: string
}

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("")
  const { data: session } = useSession()

  // Todo: useSWR to get model
  const model = "text-davinci-003"

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt) return;

    const input = prompt.trim()
    setPrompt("")

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
      }
    }
    await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
      message
    )

    //Toast notification
    const notification = toast.loading('Getting fair dinkum response...')


    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: input, chatId, model, session }),
    }).then((res) => {
      toast.success('StrayaGPT has responded!', {
        id: notification,
      })
    })
  }

  return (
    <div className="mx-auto items-center justify-center bg-white rounded-full p-2">
      <form onSubmit={sendMessage}
        className="strech p-5 space-x-5 flex h-4/5 items-center justify-center last:mb-2 md:mx-4 md:min-w-fit md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl border-gray-300 border shadow-[0_0_10px_rgba(0,0,0,0.10)] chatInput"
        // className="p-5 space-x-5 flex w-full"
        >
        <input
          className="bg-transparent focus: outline-none flex-1 text-black disabled:cursor-not-allowed w-full"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
        />
        <button disabled={!prompt || !session} type="submit"
          className="bg-yellow-400 hover: opacity-50 font-bold px-4 py-2 rounded disabled:bg-gray-200 disabled:cursor-not-allowed">
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div>
        {/* ModelSelection */}
      </div>
    </div>


    // <div className="w-full h-10 mx-auto flex items-center bg-gray-100 rounded-full p-2">
    //   <input type="text" className="bg-transparent focus:outline px-4 items-center justify-center flex-1 mx-5" placeholder="Type your message..."/>
    //     <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">Send</button>
    // </div>
  )
}

export default ChatInput

function then(arg0: () => void) {
  throw new Error("Function not implemented.")
}
