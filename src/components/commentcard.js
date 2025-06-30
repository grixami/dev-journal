"use client"

import { useState } from "react";

export default function CommentCard({ toggleQuestionBox }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isClicked, setIsClicked] = useState(false)

    const deleteCard = () => {
        setIsClicked(true)
        setTimeout(() => {
            setIsVisible(false);
        }, 500)
        
    };

    if (!isVisible) {
        return null
    }


    return (
        <div className={`border-2 rounded-2xl w-[90%] lg:w-[65%] transition-all duration-500 ease-out ${isClicked ? "max-h-0 opacity-0": "max-h-[400px] opacity-100"}`}>
            <p className="p-2 text-lg">from: username</p>
            <p className="flex p-2 sm:text-2xl text-lg items-center justify-center break-words">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <div className="flex justify-center p-2 space-x-5">
                <button className="p-2 text-2xl border-2 rounded-2xl mb-2 bg-red-700 hover:bg-red-900 transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => deleteCard()}>Remove</button>

                <button className="p-2 text-2xl border-2 rounded-2xl mb-2 hover:bg-[#3d444d] transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => toggleQuestionBox(8)}>Respond</button> {/* replace the "8" with the id of the question */}
            </div>
        </div>
    )
}