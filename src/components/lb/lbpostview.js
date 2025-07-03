import Image from "next/image"

export default function LbPostView({ post }) {
    return (
        <a href={`/post/${post.id}/view`} className="flex border-2 rounded-3xl p-3 space-x-5 w-11/12 md:w-3/5 items-center hover:bg-[#35383d] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex justify-between items-center">
                    <h2 className="sm:text-4xl text-2xl break-words">{post?.title}</h2>
                    <div className="flex items-center justify-center space-x-2 mr-2 border-2 p-1 rounded-4xl">
                        <Image
                        className="dark:invert"
                        src="/assets/img/eyeicon.png"
                        alt="views"
                        width={40}
                        height={40}
                        />
                        <p className="pr-2 text-xl break-words">{post?.views}</p>
                    </div>
                </div>
                <hr></hr>
                <p>{Buffer.from(post?.desc, "base64").toString()}</p>
            </div>
        </a>
    )
}