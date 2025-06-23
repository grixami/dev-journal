
export default function ProfilePost({postTitle, postDesc, postId}) {
    return(
        <a href={`/post/view/${postId}`}>
            <div className="border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:-translate-x-10 hover:bg-[#35383d]">
                <h2 className="text-3xl">{postTitle}</h2>
                <p>{postDesc}</p>
            </div>
        </a>
    )
}