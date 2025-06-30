"use client"

import CommentCard from "@/components/commentcard";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Questions() {

    const [questionBox, setQuestionBox] = useState(false)
    const [questionData, setQuestionData] = useState([])
    const [respondQuestion, setRespondQuestion] = useState(0) // question user is currently responding to

    const toggleQuestionBox = (id) => {
        setRespondQuestion(id)
        setQuestionBox(!questionBox)
    }

    useEffect(() => {

    }, [])

    return (
        <>
        <Head>
            <title>dev-journal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="flex flex-col items-center justify-center">
            <div>
                <h1 className="my-10 md:text-7xl text-5xl p-2 border-2 rounded-2xl">Questions</h1>
            </div>
            <div className="flex flex-col space-y-5 w-full items-center justify-center"> {/* Wireframe */}
                <CommentCard toggleQuestionBox={toggleQuestionBox}/>
                <CommentCard toggleQuestionBox={toggleQuestionBox}/>
                <CommentCard toggleQuestionBox={toggleQuestionBox}/>
            </div>
            {questionBox && (
            <div className="fixed inset-0 z-50 bg-[#010409]/30 backdrop-blur-xs flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-3 rounded-3xl w-[90%] sm:w-[50%]">
                    <h1 className="md:text-4xl text-2xl flex items-center justify-center text-center">Send a response</h1>
                    <div className="flex items-center justify-center text-center pt-3">
                    <textarea id="messagetextbox" className="resize-none border-2 focus:border-[#5a9ef9] focus:outline-none rounded-2xl p-2 w-[90%]"rows={10}></textarea>
                    </div>
                    <div className="flex items-center justify-center text-center pt-3 space-x-5">
                    <button className="py-2 sm:px-10 px-5 border-2 rounded-2xl text-2xl hover:bg-[#3d444d] hover:cursor-pointer"
                    onClick={() => toggleQuestionBox()}>Close</button>
                    <button className="py-2 sm:px-10 px-5 border-2 rounded-2xl text-2xl hover:bg-[#3d444d] hover:cursor-pointer">Send</button>
                    </div>
                </div>
            </div>
            )}

        </div>
        
        </>
    )
}