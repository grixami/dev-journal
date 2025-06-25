
export default function SearchPost({postTitle, postDesc, postId}) {
    return(
        <a href={`/post/${postId}/view`}>
            <div className="border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:translate-x-[7.5%] hover:bg-[#35383d]">
                <h2 className="text-3xl">{postTitle}</h2>
                <p className="break-words">{Buffer.from(postDesc, 'base64').toString()}</p>
            </div>
        </a>
    )
}