


export default function Comment({comment}) {

    return(
      <div className="w-full max-w-lg border-2 p-3 rounded-3xl">
        <div>
            <a href={`/user/${comment.authorId}/profile`}>
                <p>@{comment.author.username}</p>
            </a>
            <hr className="border-1"></hr>
            <p className="break-all">{comment.content}</p>
        </div>
      </div>
    )
}
