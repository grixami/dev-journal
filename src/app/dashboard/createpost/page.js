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
                                        <p>Preview</p>
                                    </button>
                                </div>
                                <form>
                                    {/* TODO, the rest of the form and add functionality */}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}