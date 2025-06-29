import React from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookies';

export default function ProfilePost({ postTitle, postDesc, postId, canedit }) {
    const router = useRouter()

    const delPost = async () => {
      
      const post = document.getElementById(`post-${postId}`)
      post.remove()
      
      const resp = await fetch("/api/post/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: getCookie("auth_token"),
          id: postId
        })
      })

    }

  return (
    <div  id={`post-${postId}`} className="border-2 border-white rounded-xl px-5 py-5 my-5 transform transition-transform duration-500 ease-in-out hover:-translate-x-[4%] hover:bg-[#35383d]">
      <div className="flex justify-between items-start">
        <a href={`/post/${postId}/view`} className="flex-1">
          <div>
            <h2 className="text-3xl break-all">{postTitle}</h2>
            <p className="break-all">{Buffer.from(postDesc, 'base64').toString()}</p>
          </div>
        </a>

        {canedit && (
          <div>
          <button className="ml-4 border-2 bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-3xl cursor-pointer"
          onClick={() => delPost()}>
            Delete
          </button>
                    <button className="ml-4 border-2 bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-2 px-4 rounded-3xl cursor-pointer"
          onClick={() => router.replace(`/post/${postId}/edit`)}>
            Edit
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
