

export default function BookmarkCard({bookmarkData}) {


    return (
        <a href={`/post/${bookmarkData.post.id}/view`} className="border-2 p-5 rounded-2xl w-11/12 sm:w-3/5 transition-transform duration-300 hover:scale-105 hover:bg-[#35383d]">
            <div>
                <h1 className="sm:text-5xl text-3xl text-center break-words">{bookmarkData.post.title}</h1>
                <p className="mt-4 break-words sm:text-base text-sm">{Buffer.from(bookmarkData.post.desc, 'base64').toString()}</p>
            </div>
        </a>
    )
}