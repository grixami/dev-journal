"use client";

export default function SearchUserProfile({userId, username, bio}) {

    return(
        <div id={userId} className="border rounded-2xl p-4 transition-transform duration-600 ease-in-out hover:translate-x-[7.5%] hover:bg-[#2c3036] hover:cursor-poi">
            <p className="break-words text-lg">{bio}</p>
            <br></br>
            <hr className="bg-amber-50"></hr>
            <br></br>
            <p className="break-words">@{username}</p>
            <p>User Id - {userId}</p>
        </div>
    )
}