"use client";

import Head from "next/head";
import NotLoginNav from "@/components/notloginnav";
import LoginNav from "@/components/loginnav";
import MainFooter from "@/components/mainfooter";
import { cookieExists } from "@/utils/cookies";
import { useState, useDeferredValue, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [transformFirstBox, setTransformFirstBox] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)"
  );

  const [transformSecondBox, setTransformSecondBox] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)"
  );

  useEffect(() => {
    if(cookieExists("auth_token")) {
      setLoggedIn(true)
    }
  }, [])

  const maxtilt = 20

  const handleMouseMoveFirstBox = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = (x/rect.width) - 0.5
    const dy = (y/rect.height) - 0.5

    const rotateX = -dy * maxtilt * 2
    const rotateY = dx * maxtilt * 2

    setTransformFirstBox(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    )
  }

  const handleMouseLeaveFirstBox = () => {
    setTransformFirstBox("perspective(800px) rotateX(0deg) rotateY(0deg)")
  }

    const handleMouseMoveSecondBox = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = (x/rect.width) - 0.5
    const dy = (y/rect.height) - 0.5

    const rotateX = -dy * maxtilt * 2
    const rotateY = dx * maxtilt * 2

    setTransformSecondBox(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    )
  }

  const handleMouseLeaveSecondBox = () => {
    setTransformSecondBox("perspective(800px) rotateX(0deg) rotateY(0deg)")
  }

  return (
    <>
      <Head>
        <title>dev-journal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLoggedIn ? (
        <LoginNav/>
      ) : (
        <NotLoginNav/>
      )}
        
      <div>
        <div className="flex flex-col justify-center items-center py-20">
          <div className="flex items-center">
            <h1 className="text-6xl mb-3">Dev Journal</h1>
            <Image
              className="ml-3 bg-black rounded-full transition-transform duration-300 hover:scale-110 hover:-rotate-10 cursor-pointer"
              src="/assets/img/github-mark-white.png"
              alt="github logo"
              width={60}
              height={60}
              onClick={() => {
                window.open("https://github.com/grixami/dev-journal", "_blank")
              }}
            />
          </div>
          <p>A place to blog about tech</p>
        </div>
        <div className="pt-10 lg:flex flex-row items-center justify-center hidden">
          <div className="border-2 px-10 py-10 mx-35 rounded-2xl w-96 bg-[#1d2222]"
          onMouseMove={handleMouseMoveFirstBox}
          onMouseLeave={handleMouseLeaveFirstBox}
          style={{ boxShadow: "0 0 10px 3px rgba(255,255,255,0.8)", transform: transformFirstBox, transition: "transform 0.2s ease-out" }}>
            <h1 className="text-2xl text-center">What is dev journal?</h1>
            <div className="h-[2px] bg-[#3d444d] w-full my-3"></div>    
            <p className="text-center">Dev Journal is a place for you to blog about your creations or discoveries, it is a place for you to connect with other developers and to share ideas</p>
          </div>
          <div className="border-2 px-10 py-10 mx-35 rounded-2xl w-96 bg-[#1d2222]"
          onMouseMove={handleMouseMoveSecondBox}
           onMouseLeave={handleMouseLeaveSecondBox}
            style={{ boxShadow: "0 0 10px 3px rgba(255,255,255,0.8)", transform: transformSecondBox, transition: "transform 0.2s ease-out" }}>
            <h1 className="text-2xl text-center">Why blog?</h1>
            <div className="h-[2px] bg-[#3d444d] w-full my-3"></div>    
            <p className="text-center">Blogging will help you reflect on your projects, writing about them is a great way to review what you have done, usually when people review projects, they find mistakes that they can later correct</p>
          </div>
        </div>
      </div>
      <MainFooter/>
    </>
  );
}