"use client"

import { db } from "@/firebase"
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

type Props = {
    id: string
}


function ChatRow({ id }: Props) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = useSession()
    const [active, setActive] = useState(false)

    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    )

    useEffect(() => {
        if (!pathname) return

        setActive(pathname.includes(id))
    }, [pathname])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace("/")
    }

    // console.log(messages?.empty)

    return (
        <div className="p-0.5 items-center">
            <Link
                href={`/chat/${id}`} className={`chatRow justify-center ${active && "bg-gray-600/50"}`}
            >
                <ChatBubbleLeftIcon className="h-4 w-4" />
                <div className="w-40">
                    <p className="flex flex-1 truncate">
                        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
                    </p>
                </div>
                <TrashIcon onClick={removeChat} className="h-4 w-4 text-gray-200 hover:text-red-700" />
            </Link>
        </div>
    )
}

export default ChatRow