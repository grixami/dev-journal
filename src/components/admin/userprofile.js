"use client";

export default function AdminManageUserProfile({userId, username, bio}) {
    return(
        <div className="border rounded-2xl p-4 transition-transform duration-600 ease-in-out hover:scale-105">
            <p className="break-words text-lg">{bio}</p>
            <br></br>
            <hr className="bg-amber-50"></hr>
            <br></br>
            <p className="break-words">@{username}</p>
            <p>User Id - {userId}</p>
            <div className="my-3">
                <div className="flex justify-center space-x-5">
                    <div className="bg-red-500 px-3 py-2 rounded-2xl hover:brightness-200 cursor-pointer" onClick={ () => { alert("TODO") }}>
                        <p>Ban</p>
                    </div>
                    <div className="bg-[#35383d] px-3 py-2 rounded-2xl hover:brightness-140 cursor-pointer">
                        <a href={`/user/${userId}/profile`}>View Profile</a>
                    </div>
                    <div className="bg-green-800 px-3 py-2 rounded-2xl hover:brightness-140 cursor-pointer" onClick={ () => { alert("TODO") }}>
                        <p>Set admin</p>
                    </div>
                </div>
            </div>
        </div>
    )
}