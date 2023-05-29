"use client"

import { signOut, useSession } from "next-auth/react"
import NewChat from "./NewChat"
import { collection, orderBy, query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"
import ChatRow from "./ChatRow"
import { useEffect, useState } from "react"
import classNames from 'classnames';
import { GiHamburgerMenu } from "react-icons/gi"
import { Disclosure } from "@headlessui/react"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"


// function SideBar() {
//     const { data: session } = useSession()
//     const [chats, loading, error] = useCollection(
//         session &&
//         query(
//             collection(db, "users", session.user?.email!, "chats"),
//             orderBy("createdAt", "asc")
//         )
//     )
//     const [isSideBarOpen, setIsSideBarOpen] = useState(true)

//     function handleToggleClick() {
//         setIsSideBarOpen(!isSideBarOpen)
//     }

//     // const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         function handleResize() {
//             setIsSideBarOpen(window.innerWidth > 640);
//         }

//         window.addEventListener('resize', handleResize);

//         // Clean up event listener on unmount
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // function handleHideClick() {
//     //     setIsSideBarOpen(false)
//     // }

//     // console.log(chats)
//     return (
//         <div className={classNames(
//             "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
//             {
//                 ["w-10 bg-[#47894b] max-w-xs p-2 flex flex-col h-screen overflow-y-auto"]: !isSideBarOpen,
//                 ["w-20"]: isSideBarOpen,
//             }
//         )}>
//             <button
//                 className="md:hidden bg-gray-300 p-2 rounded-md"
//                 onClick={handleToggleClick}
//             >
//                 Toggle
//             </button>
//             {/* <div className="hidden md:block bg-[#47894b] max-w-xs p-2 md:flex flex-col h-screen overflow-y-auto md:min-w-[20rem]"> */}
//             <div className={`${isSideBarOpen ? 'block' : 'hidden'
//                 } md:block bg-[#47894b] max-w-xs p-2 flex flex-col h-screen overflow-y-auto md:min-w-[20rem] absolute top-0 right-0 bottom-0 left-0 z-10`}
//                 style={{ display: isSideBarOpen ? 'block' : 'none' }}
//             >
//                 <button
//                     className="md:hidden bg-gray-300 p-2 rounded-md"
//                     onClick={handleToggleClick}
//                 >
//                     Hide
//                 </button>
//                 <div className="flex-1">
//                     <div>
//                         {/* NewChat */}
//                         <NewChat />
//                         {/* ModelSelection */}
//                     </div>
//                     {/* Map through the ChatRows */}
//                     {chats?.docs.map(chat => (
//                         <ChatRow key={chat.id} id={chat.id} />
//                     ))}
//                 </div>
//             </div>
//             {/* {session && (
//                 <img onClick={() => signOut()}
//                     src={session.user?.image!} alt="Profile pic"
//                     className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" />)} */}
//         </div>
//     )
// }

function SideBar() {
    const { data: session } = useSession()
    const [chats, loading, error] = useCollection(
        session &&
        query(
            collection(db, "users", session.user?.email!, "chats"),
            orderBy("createdAt", "asc")
        )
    )

    return (
        // <div className="w-3/4 md:w-60 lg:w-96 flex-shrink">
        <Disclosure as="nav">
            <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-[#00843D] hover:bg-[#FFCD00] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                <GiHamburgerMenu
                    className="block md:hidden h-6 w-6"
                    aria-hidden="true"
                />
            </Disclosure.Button>
            <div className="p-4 h-screen bg-[#00843D] z-20 fixed top-0 -left-96 md:left-0 w-3/4 md:w-60 lg:w-96 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                <div className="flex flex-col justify-start items-center">
                    <h1 className="text-base text-center item-center justify-center cursor-pointer font-bold text-[#FFCD00] border-b border-[#FFCD00] pb-4 w-full">
                        StrayaGPT
                    </h1>
                    <div className="my-4 pb-2">
                        <NewChat />
                    </div>
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
                {/* {session && (
                    <img onClick={() => signOut()}
                        src={session.user?.image!} alt="Profile pic"
                        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" />)} */}
                <div className="flex flex-row p-0.1 items-center justify-center">
                {session && (
                    <ArrowLeftOnRectangleIcon onClick={() => signOut()}
                        className="h-6 w-6 rounded-full cursor-pointer mb-2 text-[#FFCD00] hover:opacity-50" />)}
                    <p className="inline-block text-[#FFCD00]">Sign Out</p>
                </div>

            </div>
        </Disclosure>
        // </div>
    )
}

export default SideBar
