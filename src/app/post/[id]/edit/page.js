"use client";

import { use, useEffect, useState } from "react";
import { getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import Head from "next/head";
import LoginNav from "@/components/loginnav";
import MdDraggableEditor from "@/components/md/mdeditorpanel";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";
import RenderMarkdown from "@/components/md/mdrender";
import Image from "next/image";

export default function EditPost({ params }) {
    const {id} = use(params)
    const [editorText, setEditorText] = useState("")
    const [showEditor, setShowEditor] = useState(true)

    const [postTitle, setPostTitle] = useState("")
    const [postDesc, setPostDesc] = useState("")
    const [postType, setPostType] = useState("1");

    const [uploadBox, setUploadBox] = useState(false)
    
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [unloadWarningEnabled, setUnloadWarningEnabled] = useState(true);

    const [errorBox, setErrorBox] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        const getPost = async () => {
            const resp = await fetch(`/api/post/editpost?id=${id}&token=${getCookie("auth_token")}`, {
              method: "GET"
            })
            if(resp.status != 200) {
                router.replace("/") // makes unortharised users exit
            }
            const data = await resp.json();

            const title = document.getElementById("posttitle")
            title.value = data.title
            setPostTitle(data.title)

            const desc = document.getElementById("description")
            desc.value = Buffer.from(data.desc, 'base64').toString()
            setPostDesc(Buffer.from(data.desc, 'base64').toString())

            const editor = document.getElementById("my-editor")
            editor.value = Buffer.from(data.content, 'base64').toString()
            setEditorText(Buffer.from(data.content, 'base64').toString())
        }
        getPost()
    }, [id])
    const addToTextArea = function (text_to_add) { // from https://codepen.io/Fantantonio/pen/oNdreeB
        let textarea = document.getElementById("my-editor");
        let start_position = textarea.selectionStart;
        let end_position = textarea.selectionEnd;

        textarea.value = `${textarea.value.substring(
            0,
            start_position
        )}${text_to_add}${textarea.value.substring(
            end_position,
            textarea.value.length
        )}`;

        setEditorText(textarea.value) // so if a user previews, it is not lost
    };

    const toggleUploadBox = function () {
        const editor = document.getElementById("editor");
        if(!uploadBox) {
            setUploadBox(true)
            editor.className = "h-[100vh] blur"
        } else {
            setUploadBox(false)
            editor.className = "h-[100vh]"
        }

    }

    let postSubmit = async () => {
        setLoading(true)
        const resp = await fetch("/api/post/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: getCookie("auth_token"),
                title: postTitle,
                desc: postDesc,
                content: editorText,
                postType: postType,
                id: id

            })
        })
        if(resp.status != 200) {
            setErrorBox(true)
            setLoading(false)
            const data = await resp.json()
            setErrorMsg(data.message)
            if(resp.status == 429) {
                setErrorMsg("You have been rate-limited, try again later")
            }
            return
        }
        setErrorBox(false)
        setLoading(false)
        router.replace("/dashboard")
    }


    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {showEditor ? (
            <div className="h-full">
                <div id="editor" className="h-[100vh]">

                <LoginNav/>
                <MdDraggableEditor addToTextArea={addToTextArea}/>

                <div className="flex scrollbar h-full">
                    
                    <label htmlFor="my-editor" className="block w-full border-r-2 border-[#3d444d]">
                        <textarea
                            id="my-editor"
                            className="w-full h-full resize-none outline-none scrollbar scrollbar-thumb-white p-2"
                            placeholder="Start typing..."
                            defaultValue={editorText}
                            onChange={(e) => setEditorText(e.target.value) }
                        />
                    </label>
                    <div className="w-[30%] bg-[#010409]">
                        <div className="border h-full">
                            <div className="flex items-center justify-center">
                                <div className="my-[6%] relative transition-transform duration-300 ease-in-out hover:scale-105 group">
                                    <div className="absolute inset-0 opacity-0 rounded-3xl blur group-hover:opacity-100 group-hover:bg-amber-50">

                                    </div>

                                    <button className="relative bg-[#010409] rounded-3xl px-15 py-2 border-2 group-hover:cursor-pointer"
                                    onClick={() => {setShowEditor(false)}}
                                    >
                                        <p className="text-xl">Preview</p>
                                    </button>
                                </div>
                            </div>
                            <hr className="border-t-2"></hr>
                            <div className="flex items-center justify-center mt-4">
                                <div className="w-full">
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label htmlFor="title" className="text-center text-2xl">Post Title</label>
                                        <input type="text" id="posttitle" name="title" defaultValue={postTitle} className="border-2 w-[80%] rounded-3xl px-4 py-2 border-white focus:border-[#5a9ef9] focus:outline-none mt-2"
                                        onChange={(e) => setPostTitle(e.target.value)}></input>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mt-4 w-full">
                                        <label htmlFor="description" className="text-2xl">Post Description</label>
                                        <textarea id="description" name="description" rows="7" defaultValue={postDesc} className="mt-4 w-[80%] p-2 rounded-3xl resize-none focus:outline-none border-2 border-white focus:border-[#5a9ef9]"
                                        onChange={(e) => setPostDesc(e.target.value)}></textarea>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 space-x-3">
                                        <input type="radio" id="publish" name="postType" value="publish" defaultChecked className="hidden peer/publish"
                                        onChange={(e) => setPostType("1")}></input>
                                        <label htmlFor="publish" className="hover:cursor-pointer border-2 border-white p-3 rounded-3xl bg-[#010409] peer-checked/publish:bg-red-600 peer-checked/publish:scale-105 transition-transform duration-600">
                                            Publish
                                        </label>

                                        <input type="radio" id="draft" name="postType" value="draft" className="hidden peer/draft"
                                        onChange={(e) => setPostType("0")}></input>
                                        <label htmlFor="draft" className="hover:cursor-pointer border-2 border-white p-3 rounded-3xl bg-[#010409] peer-checked/draft:bg-red-600 peer-checked/draft:scale-110 transition-transform duration-600">
                                            Draft
                                        </label>       
                                    </div>
                                    <hr className="border-t-2 mt-4"></hr>
                                    <div className="flex items-center justify-center mt-4">
                                        <button className="bg-[#010409] px-10 py-2 rounded-4xl border-2 border-white hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
                                        onClick={() => toggleUploadBox()}>
                                            <p className="text-4xl text-center"><b>save</b></p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
            {uploadBox == true && (
            <div className="z-220 fixed inset-0 bg-black/75">
                <div className="z-30 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col bg-black rounded-4xl">
                        <h1 className="pt-10 px-15 text-2xl">Are you sure you want to save?</h1>
                        <div className="flex justify-center items-center pt-20 space-x-10">
                            {loading ? (
                            <div className="p-5">
                                <TransparrentLoadingGif/>
                            </div>
                            ): (
                            <div className="flex flex-col space-y-4">
                            <div className="flex flex-row space-x-5">
                                <div className="flex items-center justify-center">
                                    <div className="my-[6%] relative transition-transform duration-300 ease-in-out hover:scale-105 group">
                                        <div className="absolute inset-0 opacity-0 rounded-3xl blur group-hover:opacity-100 group-hover:bg-amber-50">

                                        </div>

                                        <button className="relative bg-[#010409] rounded-3xl px-15 py-2 border-2 group-hover:cursor-pointer"
                                        onClick={() => toggleUploadBox()}
                                        >
                                        <p className="text-xl">Cancel</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="my-[6%] relative transition-transform duration-300 ease-in-out hover:scale-105 group">
                                        <div className="absolute inset-0 opacity-0 rounded-3xl blur group-hover:opacity-100 group-hover:bg-amber-50">

                                        </div>

                                        <button className="relative bg-[#010409] rounded-3xl px-15 py-2 border-2 group-hover:cursor-pointer"
                                        onClick={() => postSubmit()}
                                        >
                                        <p className="text-xl">Save</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                                { errorBox && (
                                    <div className="flex items-center justify-center pb-4">
                                        <div className="bg-red-600 p-3 rounded-3xl">
                                            <p>Error: {errorMsg}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            )}
                        
                        </div>
                    </div>
                </div>
            </div>
            )}
            </div>
            
            ) : (

            <div className="h-full" id="preview">
                <div>
                    <div className="p-10">
                        <RenderMarkdown contentParam={editorText}/>
                    </div>
                    <div className="group">
                        <div className="top-[10%] right-[10%] fixed group transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-10">
                            <div className="absolute -inset-1 rounded-full blur bg-amber-50"></div>

                            <button className="relative bg-black p-5 rounded-full hover:cursor-pointer"
                            onClick={() => setShowEditor(true)}>
                                <Image
                                    className="dark:invert"
                                    src="/assets/img/arrow.png"
                                    alt="backArrow"
                                    width={100}
                                    height={100}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}