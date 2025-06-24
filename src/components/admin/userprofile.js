"use client";

import { getCookie } from "@/utils/cookies";
import { useState } from "react";

export default function AdminManageUserProfile({userId, username, bio}) {
    const [showMessagebox, setShowMessageBox] = useState(false)
    const [message, setMessage] = useState("")


    let sendRequest = async (actionType, user) => {
        const resp = await fetch("/api/admin/manageuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: actionType,
                user: userId,
                token: getCookie("auth_token")
            })
        })
        if(resp.status != 200) {
            setShowMessageBox(true)
            const data = await resp.json();
            setMessage(data.message)
            
        }

        return resp.status
    }

    let handleBanClick = async (e) => {
        const element = document.getElementById(`${userId}`)
        const newspaperSpinning = [
            { transform: "rotate(0) scale(1)" },
            { transform: "rotate(20) scale(1.2)" },
            { transform: "rotate(30deg) scale(1.3)" },
            { transform: "rotate(-10deg) scale(0)" },
        ];

        const newspaperTiming = {
            duration: 300,
            iterations: 1,
            easing: "ease-out"
        };
        const animation = element.animate(newspaperSpinning, newspaperTiming);
        
        animation.finished.then(() => {
            element.remove();
        });
        await sendRequest("ban", {userId})
    }

    let handleAdminClick = async (e) => {
        const element = document.getElementById(`${userId}`)
        element.style.backgroundColor = "green"
        await sendRequest("adminify", {userId})
    }

    return(
        <div id={userId} className="border rounded-2xl p-4 transition-transform duration-600 ease-in-out hover:scale-105">
            <p className="break-words text-lg">{bio}</p>
            <br></br>
            <hr className="bg-amber-50"></hr>
            <br></br>
            <p className="break-words">@{username}</p>
            <p>User Id - {userId}</p>
            <div className="my-3">
                <div className="flex justify-center space-x-5">
                    <div className="bg-red-500 px-3 py-2 rounded-2xl hover:brightness-200 cursor-pointer" onClick={ handleBanClick }>
                        <p>Ban</p>
                    </div>
                    <div className="bg-[#35383d] px-3 py-2 rounded-2xl hover:brightness-140 cursor-pointer">
                        <a href={`/user/${userId}/profile`}>View Profile</a>
                    </div>
                    <div className="bg-green-800 px-3 py-2 rounded-2xl hover:brightness-140 cursor-pointer" onClick={ handleAdminClick }>
                        <p>Set admin</p>
                    </div>
                </div>
                {showMessagebox && (
                    <div className="mt-3 p-3 bg-red-500 rounded-lg shadow-md">
                        <p>Error</p>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}