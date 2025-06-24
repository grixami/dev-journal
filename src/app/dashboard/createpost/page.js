"use client";

import Head from "next/head"
import LoginNav from "@/components/loginnav"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import RenderMarkdown from "@/components/md/mdrender";
import Image from "next/image";

export default function CreatePost() {
    const [editorText, setEditorText] = useState("")
    const [showEditor, setShowEditor] = useState(true)
    const router = useRouter()
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {showEditor ? (
            <div className="h-full" id="editor">
                <div className="h-[100vh]">
                <LoginNav/>
                <div className="flex scrollbar h-full">
                    <label htmlFor="my-editor" className="block w-full border-r-2 border-[#3d444d]">
                        <textarea
                            id="my-editor"
                            className="w-full h-full resize-none outline-none scrollbar scrollbar-thumb-white"
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
                                <form className="w-full">
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label htmlFor="title" className="text-center text-2xl">Post Title</label>
                                        <input type="text" name="title" className="border-2 w-[80%] rounded-3xl px-4 py-2 border-white focus:border-[#5a9ef9] focus:outline-none mt-2"></input>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mt-4 w-full">
                                        <label htmlFor="description" className="text-2xl">Post Description</label>
                                        <textarea id="description" name="description" rows="7" className="mt-4 w-[80%] p-2 rounded-3xl resize-none focus:outline-none border-2 border-white focus:border-[#5a9ef9]"></textarea>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 space-x-3">
                                        <input type="radio" id="publish" name="postType" value="publish" defaultChecked className="hidden peer/publish"></input>
                                        <label htmlFor="publish" className="hover:cursor-pointer border-2 border-white p-3 rounded-3xl bg-[#010409] peer-checked/publish:bg-red-600 peer-checked/publish:scale-105 transition-transform duration-600">
                                            Publish
                                        </label>

                                        <input type="radio" id="draft" name="postType" value="draft" className="hidden peer/draft"></input>
                                        <label htmlFor="draft" className="hover:cursor-pointer border-2 border-white p-3 rounded-3xl bg-[#010409] peer-checked/draft:bg-red-600 peer-checked/draft:scale-110 transition-transform duration-600">
                                            Draft
                                        </label>       
                                    </div>
                                    <hr className="border-t-2 mt-4"></hr>
                                    <div className="flex items-center justify-center mt-4">
                                        <button type="submit" className="bg-[#010409] px-10 py-2 rounded-4xl border-2 border-white hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                            <p className="text-4xl text-center"><b>post</b></p>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
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