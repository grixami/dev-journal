"use client";

import Image from "next/image";

export default function SearchUserProfile({userId, username, bio, pfp}) {

    return(
        <a href={`/user/${userId}/profile`}>
            <div id={userId} className="border rounded-2xl p-4 transition-transform duration-600 ease-in-out hover:translate-x-[7.5%] hover:bg-[#2c3036]">
                <div className="flex flex-row">
                    <div className="flex justify-center items-center">
                        {pfp != null ? (
                            <Image
                                className="rounded-full border-2 border-white"
                                src={`data:image/png;base64, ${pfp}`}
                                alt="pfp"
                                height={100}
                                width={100}            
                            />
                        ) : (
                            <Image
                                className="rounded-full border-2 border-white"
                                src="/assets/img/defaultprofile.png"
                                alt="pfp"
                                height={100}
                                width={100}
                            />
                        )}
                    </div>
                    <div className="ml-[3%] w-full">
                        <p className="break-words text-lg">{bio}</p>
                        <br></br>
                        <hr className="bg-amber-50"></hr>
                        <br></br>
                        <p className="break-words">@{username}</p>
                        <p>User Id - {userId}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}