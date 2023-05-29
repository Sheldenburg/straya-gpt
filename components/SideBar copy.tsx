"use client"

import { signOut, useSession } from "next-auth/react"
import NewChat from "./NewChat"
import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"
import ChatRow from "./ChatRow"
import { useState } from "react"
import classNames from 'classnames';


function SideBar() {
    const { data: session } = useSession()
    const [chats, loading, error] = useCollection(
        session &&
        query(
            collection(db, "users", session.user?.email!, "chats"),
            orderBy("createdAt", "asc")
        )
    )
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    function handleToggleClick() {
        setIsSideBarOpen((prevState) => !prevState)
    }

    function handleHideClick() {
        setIsSideBarOpen(false)
    }

    // console.log(chats)
    return (
        <div className={classNames('relative',{'w-10':isSideBarOpen})}>
            <button
                className="md:hidden bg-gray-300 p-2 rounded-md"
                onClick={handleToggleClick}
            >
                Toggle
            </button>
            {/* <div className="hidden md:block bg-[#47894b] max-w-xs p-2 md:flex flex-col h-screen overflow-y-auto md:min-w-[20rem]"> */}
            <div className={`${isSideBarOpen ? 'block' : 'hidden'
                } md:block bg-[#47894b] max-w-xs p-2 flex flex-col h-screen overflow-y-auto md:min-w-[20rem] absolute top-0 right-0 bottom-0 left-0 z-10`}
                style={{ display: isSideBarOpen ? 'block' : 'none' }}
            >
                <button
                    className="md:hidden bg-gray-300 p-2 rounded-md"
                    onClick={handleHideClick}
                >
                    Hide
                </button>
                <div className="flex-1">
                    <div>
                        {/* NewChat */}
                        <NewChat />
                        {/* ModelSelection */}
                    </div>
                    {/* Map through the ChatRows */}
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
            </div>
            {/* {session && (
                <img onClick={() => signOut()}
                    src={session.user?.image!} alt="Profile pic"
                    className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" />)} */}
        </div>
    )
}

export default SideBar
