"use client"

import { useState } from "react";

export default function QuestionCard({ toggleQuestionBox, canRespond, question, deleteQuestion }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isClicked, setIsClicked] = useState(false)

    const deleteCard = () => {
        setIsClicked(true)
        deleteQuestion(question.id)
        setTimeout(() => {
            setIsVisible(false);
        }, 500)

        
        
    };

    if (!isVisible) {
        return null
    }


    return (
        <div className={`border-2 rounded-2xl w-[90%] lg:w-[65%] transition-all duration-500 ease-out ${isClicked ? "max-h-0 opacity-0": "max-h-[400px] opacity-100"}`}>
            {canRespond ? (
                <p className="p-2 text-lg">from: {question.sender.username}</p>
            ) : (
                <p className="p-2 text-lg">response by: {question.receiver.username}</p>
            )}
            <p className="flex p-2 sm:text-2xl text-lg items-center justify-left break-words">question: {question.question}</p>
            {!canRespond && (
                <p className="flex p-2 sm:text-2xl text-lg items-center justify-left break-words">Response: {question.response}</p>
            )}
            <div className="flex justify-center p-2 space-x-5 flex-col sm:flex-row">
                <button className="w-full sm:w-auto p-1 sm:p-2 text-lg sm:text-2xl border-2 rounded-2xl mb-2 bg-red-700 hover:bg-red-900 transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => deleteCard()}>Delete</button>
                {canRespond && (
                <button className="sm:w-auto p-1 sm:p-2 text-lg sm:text-2xl border-2 rounded-2xl mb-2 hover:bg-[#3d444d] transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => toggleQuestionBox(question.id)}>Respond</button>
                )}
            </div>
        </div>
    )
}