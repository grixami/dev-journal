import Head from "next/head"
import LoginNav from "@/components/loginnav"

export default function CreatePost() {
    return(
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <LoginNav/>
                <div className="flex scrollbar">
                    <label htmlFor="my-editor" className="block w-full h-[90vh] border-r-2 border-[#3d444d]">
                        <textarea
                            name="my-editor"
                            className="w-full h-full resize-none outline-none scrollbar scrollbar-thumb-white"
                            placeholder="Start typing..."
                        />
                    </label>
                    <div className="w-[30%] bg-[#010409]">
                        <div className="border h-full">
                            <div className="flex items-center justify-center">
                                <div className="my-[6%] relative transition-transform duration-300 ease-in-out hover:scale-105 group">
                                    <div className="absolute inset-0 opacity-0 rounded-3xl blur group-hover:opacity-100 group-hover:bg-amber-50">

                                    </div>

                                    <button className="relative bg-[#010409] rounded-3xl px-15 py-2 border-2 group-hover:cursor-pointer">
                                        <p className="text-xl">Preview</p>
                                    </button>
                                </div>
                            </div>
                            <hr className="border-t-2"></hr>
                            <div className="flex items-center justify-center mt-4">
                                <form className="w-full">
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <lable htmlFor="title" className="text-center text-2xl">Post Title</lable>
                                        <input type="text" name="title" className="border-2 w-[80%] rounded-3xl px-4 py-2 border-white focus:border-[#5a9ef9] focus:outline-none mt-2"></input>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mt-4 w-full">
                                        <label htmlFor="description" className="text-2xl">Post Description</label>
                                        <textarea id="description" name="description" rows="7" className="mt-4 w-[80%] p-2 rounded-3xl resize-none focus:outline-none border-2 border-white focus:border-[#5a9ef9]"></textarea>
                                    </div>
                                    <div className="flex items-center justify-center mt-4 space-x-3">
                                        <input type="radio" id="publish" name="postType" value="publish" defaultChecked className="hidden peer/publish"></input>
                                        <label htmlFor="publish" className="hover:cursor-pointer border-2 border-white p-3 rounded-3xl bg-[#010409] peer-checked/publish:bg-red-600 peer-checked/publish:scale-105 transition duration-600">
                                            Publish
                                        </label>

                                        <input type="radio" id="draft" name="postType" value="draft" className="hidden peer/draft"></input>
                                        <label htmlFor="draft" className="hover:cursor-pointer border-2 border-white p-3 rounded-3xl bg-[#010409] peer-checked/draft:bg-red-600 peer-checked/draft:scale-110 transition duration-600">
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
        </>
    )
}