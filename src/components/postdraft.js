
export default function PostDraft({postTitle, postDesc, postId, deleteDraft}) {
    return(
        <div href={`/post/${postId}/edit`}>
            <div className="flex justify-between border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:scale-102 hover:bg-[#35383d]">
                <a  href={`/post/${postId}/edit`} className="flex flex-col w-full">
                <h2 className="sm:text-3xl text-2xl">{postTitle}</h2>
                <p className="break-words">{Buffer.from(postDesc, 'base64').toString()}</p>
                </a>
                <div >
                    <button className="text-lg border-2 p-2 rounded-3xl bg-red-600 transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:bg-red-800"
                    onClick={() => deleteDraft(postId)}>Delete</button>
                </div>
            </div>
        </div>
    )
}