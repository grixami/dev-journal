"use client"

import LoginNav from "@/components/loginnav";
import NotLoginNav from "@/components/notloginnav";
import { cookieExists } from "@/utils/cookies";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Custom404() {

    const [isLoggedIn, setLoggedIn] = useState(false);

    const [transformBox, setTransformBox] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)"
    );

    const maxtilt = 10

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const dx = (x/rect.width) - 0.5
        const dy = (y/rect.height) - 0.5

        const rotateX = -dy * maxtilt * 2
        const rotateY = dx * maxtilt * 2

        setTransformBox(
        `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
        )
    }

    const handleMouseLeave = () => {
        setTransformBox("perspective(800px) rotateX(0deg) rotateY(0deg)")
    }

    useEffect(() => {
        setLoggedIn(cookieExists("auth_token"))
    }, [])

    return (
        <>
            <Head>
                <title>dev-journal 404</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                
                {isLoggedIn ? (
                    <LoginNav/>
                ) : (
                    <NotLoginNav/>
                )}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:p-10 p-5 border-5 rounded-4xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ boxShadow: "0 0 10px 3px rgba(255,255,255,0.8)", transform: transformBox, transition: "transform 0.2s ease-out" }}>
                    <h1 className="lg:text-7xl md:text-5xl text-2xl"><b>404: Page not found</b></h1>
                </div> 
            </div>
        </>
    )
}