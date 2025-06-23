"use client";
import Head from "next/head";
import NotLoginNav from "@/components/notloginnav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieExists } from "@/utils/cookies";

export default function Signup() {
    const router = useRouter();

    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistrationFailed, setIsRegistrationFailed] = useState(false);
    const [failMessage, setFailMessage] = useState(""); // starts as empty string
    
      useEffect(() => {
        if(cookieExists("auth_token")) {
            router.replace("/");
        }

      }, [router]);


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents form from submitting
        setIsRegistered(false)
        setIsRegistrationFailed(false)
        const username = e.target.username.value;
        const password = e.target.password.value
        //console.log(username)

        try {
          const resp = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password
            }),
          })
          if(resp.status == 200) {
            setIsRegistered(true)
          } else {
            const data = await resp.json()
            setIsRegistrationFailed(true)
            setFailMessage(data.message)
          }
        } catch(error) {
          console.error('Error during signup:', error);
        }

  };
  return (
    <>
      <Head>
        <title>dev-jornal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
    <div className="min-h-screen flex flex-col">
        <NotLoginNav />
      <div className="flex items-center justify-center">
        <div className="border border-[#3d444d] w-full max-w-xl rounded-2xl bg-[#1d2222] p-6 flex flex-col items-center shadow-[0_0_20px_#3d444d] my-60">
            <h1 className="text-3xl py-3">Sign Up Form</h1>
            <div className="h-[2px] bg-[#3d444d] w-full"></div>    
            <div className="py-2">
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2" htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required
                        className="w-full mb-4 rounded-md p-2 bg-[#1a1f21] border border-[#3d444d] focus:outline-none focus:border-[#5a9ef9]"
                        pattern="[a-zA-Z0-9]+"
                    />

                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        type="password" id="password" name="password" placeholder="Enter your password" required
                        className="w-full mb-4 rounded-md p-2 bg-[#1a1f21] border border-[#3d444d] focus:outline-none focus:border-[#5a9ef]"
                    />
                    <button type="submit"className="mx-auto block border border-[#f0f6fc] px-4 py-2 rounded-lg hover:bg-[#35383d]">Sign Up</button>
                </form>
            </div>
          {isRegistered && (
            <div className="bg-lime-600 rounded-xl px-3 py-3 border">
              <p>Registration Completed, please go to <a href="/auth/login" className="text-blue-400">Login</a></p>
            </div>
          )}
          {isRegistrationFailed && (
            <div className="bg-red-600 rounded-xl px-3 py-3 border">
              <p>Registration Failed, {failMessage}, please try again</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}