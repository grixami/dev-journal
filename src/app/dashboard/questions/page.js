"use client"

import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";
import LoginNav from "@/components/loginnav";
import QuestionCard from "@/components/questionCard";
import { getCookie } from "@/utils/cookies";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Questions() {
    const [pageLoading, setPageLoading] = useState(true)

    const [questionBox, setQuestionBox] = useState(false)
    const [sentQuestionData, setSentQuestionData] = useState([])
    const [receivedQuestionData, setReceivedQuestionData] = useState([])
    
    const [respondQuestion, setRespondQuestion] = useState(0) // question user is currently responding to
    const [sendRespondLoading, setSendRespondLoading] = useState(false)

    const [respondQuestionSucessMsg, setRespondQuestionSucessMsg] = useState("")
    const [respondQuestionErrMsg, setRespondQuestionErrMsg] = useState("")

    const [page, setPage] = useState("received")
   

    const toggleQuestionBox = (id) => {
        setRespondQuestion(id)
        setQuestionBox(!questionBox)
    }

    const sendResponse = async () => {
        setSendRespondLoading(true)
        setRespondQuestionErrMsg("")
        setRespondQuestionSucessMsg("")

        const responseElement = document.getElementById("messagetextbox")
        const responseMessage = responseElement.value

        const resp = await fetch("/api/questions/setresponse", {
            method: "POST",
            headers: {
                "Content-Type" : "application-json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                questionId: respondQuestion,
                responseMessage: responseMessage
            })

        })

        if(resp.status != 200) {
            const respJson = await resp.json()
            setRespondQuestionErrMsg(respJson.message)
            if(resp.status == 429) {
                setRespondQuestionErrMsg("You have been rate limited")
            }
        } else {
            setRespondQuestionSucessMsg("sucess")
        }
        setSendRespondLoading(false)
        setReceivedQuestionData((prev) => prev.filter(q => q.id !== respondQuestion));
        
    }

    const deleteQuestion = async (questionId) => {
        const resp = await fetch("/api/questions/deletequestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                questionId: questionId
            })
        })
        if (resp.status == 200) {
            setSentQuestionData((prev) => prev.filter(q => q.id !== questionId));
            setReceivedQuestionData((prev) => prev.filter(q => q.id !== questionId));
        }
    }

    useEffect(() => {
        const getQuestions = async () => {
            const sentResp = await fetch(`/api/questions/getsentquestions?token=${getCookie("auth_token")}`)
            const sentJson = await sentResp.json()
            setSentQuestionData(sentJson)
            
            const receivedResp = await fetch(`/api/questions/getreceivedquestions?token=${getCookie("auth_token")}`)
            const receivedJson = await receivedResp.json()
            setReceivedQuestionData(receivedJson)
            setPageLoading(false)
        }
        getQuestions()
        
    }, [])

    return (
        <>
        <Head>
            <title>dev-journal</title>
            <meta name="description" content="A Blogging Site For Devs" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LoginNav/>
        {!pageLoading ? (
        <div className="flex flex-col items-center justify-center">
            <div>
                <h1 className="my-10 md:text-7xl text-5xl p-4 border-3 rounded-2xl ">Questions</h1>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:space-x-5 mb-4 flex-col sm:flex-row">
                <button className="p-1 sm:p-2 text-lg sm:text-2xl border-2 rounded-2xl mb-2 hover:bg-[#3d444d] transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => setPage("received")}>Received questions</button>
                                
                <button className="p-1 sm:p-2 text-lg sm:text-2xl border-2 rounded-2xl mb-2 hover:bg-[#3d444d] transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => setPage("responses")}>Responses to your questions</button>
            </div>
            <div className="flex flex-col space-y-5 w-full items-center justify-center"> {/* Wireframe */}
                {page == "received" ? (
                receivedQuestionData.map((question) => (
                    question.response == null && (
                    <QuestionCard key={question.id} deleteQuestion={deleteQuestion} toggleQuestionBox={toggleQuestionBox} canRespond={true} question={question}/>    
                )))
                ) : (
                sentQuestionData.map((question) => (
                    question.response != null && (
                        <QuestionCard key={question.id} deleteQuestion={deleteQuestion} toggleQuestionBox={toggleQuestionBox} question={question}/>   
                    )
                ))
                )}

            </div>
            {questionBox && (
            <div className="fixed inset-0 z-50 bg-[#010409]/30 backdrop-blur-xs flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-3 rounded-3xl w-[90%] sm:w-[50%]">
                    <h1 className="md:text-4xl text-2xl flex items-center justify-center text-center">Send a response</h1>
                    <div className="flex items-center justify-center text-center pt-3">
                        <textarea id="messagetextbox" className="resize-none border-2 focus:border-[#5a9ef9] focus:outline-none rounded-2xl p-2 w-[90%]"rows={10}></textarea>
                    </div>
                    {!sendRespondLoading ? (
                    <div className="flex items-center justify-center text-center pt-3 space-x-5">
                        <button className="py-2 sm:px-10 px-5 border-2 rounded-2xl text-2xl hover:bg-[#3d444d] hover:cursor-pointer"
                        onClick={() => toggleQuestionBox()}>Close</button>
                        <button className="py-2 sm:px-10 px-5 border-2 rounded-2xl text-2xl hover:bg-[#3d444d] hover:cursor-pointer"
                        onClick={() => sendResponse()}>Send</button>
                    </div>
                    ) : (
                    <div className="flex items-center justify-center text-center pt-3 space-x-5">
                        <TransparrentLoadingGif width={50} height={50}/>
                    </div>
                    )}
                    <div className="flex items-center justify-center mt-5">
                        {respondQuestionErrMsg.length > 0 && (
                            <div className="bg-red-600 p-3 rounded-3xl border-2">
                                <p>Error: {respondQuestionErrMsg}</p>
                            </div>
                        )}

                        {respondQuestionSucessMsg.length > 0 && (
                            <div className="bg-green-600 p-3 rounded-3xl border-2">
                                <p>sucess</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
        ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TransparrentLoadingGif width={250} height={250}/>
            </div>
        )}
        </>
    )
}