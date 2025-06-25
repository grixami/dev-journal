import Draggable from "react-draggable"
import { useRef, useState } from "react"
import Image from "next/image";

export default function MdDraggableEditor({addToTextArea}) { // addToTextArea is just the func for adding text to the edior, only used in /dashboard/createpost as of now, will update
    const draggableRef = useRef(null);
    const [activeDropDown, setActiveDropdown] = useState(null);

    const changeDropdown = (dropdown) => {
        if(activeDropDown == dropdown) {
            setActiveDropdown(null);
            return
        }
        setActiveDropdown(dropdown);
    }

    return (
        <Draggable nodeRef={draggableRef}>
            <div ref={draggableRef} className="z-10 flex flex-row border-2 space-x-4 absolute top-[10%] right-[25%]  bg-[#010409]/30 backdrop-blur-xs text-white p-4 rounded-2xl shadow-lg cursor-move">
                <div className="bg-[#35383d] rounded-2xl">
                    <button className="flex flex-row items-center justify-center px-5 py-2 hover:cursor-pointer" onClick={() => changeDropdown("head")}>
                        <p>Heading</p>
                        <Image
                            className="dark:invert pl-2"
                            alt=""
                            src="/assets/img/downarrow.png"
                            width={30}
                            height={30}
                        />
                    </button>
                    { activeDropDown == "head" && (
                        <div className="absolute py-2 space-y-2">
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("#")}>h1</button>
                            </div>
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("##")}>h2</button>
                            </div>
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("###")}>h3</button>
                            </div>
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("####")}>h4</button>
                            </div>
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("#####")}>h5</button>
                            </div>

                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("######")}>h6</button>
                            </div>
                        </div>

                    )}
                </div>
                <div className="bg-[#35383d] rounded-2xl">
                    <button className="flex flex-row items-center justify-center px-5 py-2 hover:cursor-pointer" onClick={() => changeDropdown("katex")}>
                        <p>katex</p>
                        <Image
                            className="dark:invert pl-2"
                            alt=""
                            src="/assets/img/downarrow.png"
                            width={30}
                            height={30}
                        />
                    </button>
                    { activeDropDown == "katex" && (
                        <div className="absolute py-2 space-y-2">
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("$math$")}>single line</button>
                            </div>
                            <div className="bg-[#35383d] rounded-2xl">
                                <button className="px-5 py-2" onClick={() => addToTextArea("$$\nmath\n$$")}>multi line</button>
                            </div>
                        </div>

                    )}
                </div>
                <div className="bg-[#35383d] rounded-2xl">
                    <button className="px-5 py-2" onClick={() => addToTextArea("```lang\n[code]\n```")}>codeblock</button>
                </div>                
                <div className="bg-[#35383d] rounded-2xl">
                    <button className="px-5 py-2" onClick={() => addToTextArea("[name](link)")}>link</button>
                </div>

                <div className="bg-[#35383d] rounded-2xl">
                    <button className="px-5 py-2" onClick={() => addToTextArea("![alt](image-link)")}>image</button>
                </div>
                <div className="bg-[#35383d] rounded-2xl">
                    <button className="px-5 py-2" onClick={() => addToTextArea(" - [ ] name")}>checkbox</button>
                </div>
            </div>
        </Draggable>
    )
}