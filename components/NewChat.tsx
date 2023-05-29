"use client"

import { db } from "@/firebase"
import { PlusIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

function NewChat() {
  const router = useRouter()
  const { data: session } = useSession()

  const createNewChat = async () => {
    const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
      messages: [],
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    })
    console.log(doc.id)
    router.push(`/chat/${doc.id}`)
  }

  return (
    <div onClick={createNewChat} className="border-[#FFCD00] border chatRow">
      <PlusIcon className="h-4 w-4 text-[#FFCD00]" />
      <p className="text-[#FFCD00]">New Chat</p>
    </div>
  )
}

export default NewChat