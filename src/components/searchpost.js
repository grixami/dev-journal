
export default function SearchPost({post}) {
    return(
        <div>
            <a href={`/post/${post.id}/view`}>
                <div className="flex border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:translate-x-[2.5%] hover:bg-[#35383d]">
                    <div className="flex-row">
                    <h2 className="text-3xl">{post.title}</h2>
                    <p className="break-words">{Buffer.from(post.desc, 'base64').toString()}</p>
                    </div>
                    <div className="flex w-full items-center justify-end">
                        <div className="bg-red-600 mr-1 p-1 rounded-2xl border-2">
                            <p>{post.postTag}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}
