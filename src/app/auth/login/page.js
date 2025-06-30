"use client";
import Head from "next/head";
import NotLoginNav from "@/components/notloginnav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieExists } from "@/utils/cookies";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";

export default function Login() {
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter();

    useEffect(() => {
      if(cookieExists("auth_token")) {
          router.replace("/");
      }
    }, [router]);

    const handleSubmit = async (e) => {
        setSubmitted(true)
        e.preventDefault(); // Prevents form from submitting
        const username = e.target.username.value;
        const password = e.target.password.value
        try {
          const resp = await fetch("/api/auth/login", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username,
                password
              }),
          });

          const data = await resp.json();

          if(resp.status != 200) {
            setIsError(true);
            setErrorMessage(data.message);
            setSubmitted(false)
              if(resp.status == 429) {
                setErrorMsg("You have been rate-limited, try again later")
            }
            return;
          }
          
        
          document.cookie = `auth_token=${data.token}; path=/;`;
          router.replace("/dashboard");
        } catch(error) {
          console.log("Error duting login", error);
        }
        setSubmitted(false)

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
            <h1 className="text-3xl py-3">Login Form</h1>
            <div className="h-[2px] bg-[#3d444d] w-full"></div>    
            <div className="py-2">
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2" htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required
                        className="w-full mb-4 rounded-md p-2 bg-[#1a1f21] border border-[#3d444d] focus:outline-none focus:border-[#5a9ef9]"
                    />

                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        type="password" id="password" name="password" placeholder="Enter your password" required
                        className="w-full mb-4 rounded-md p-2 bg-[#1a1f21] border border-[#3d444d] focus:outline-none focus:border-[#5a9ef]"
                    />
                    {submitted ? (
                      <TransparrentLoadingGif className="mx-auto block"/>
                    ) : (
                      <button type="submit"className="mx-auto block border border-[#f0f6fc] px-4 py-2 rounded-lg hover:bg-[#35383d] hover:cursor-pointer">Login</button>
                    )}
                </form>
            </div>
            <div className="mt-2">
              <a href="/auth/resetpassword" className="hover:cursor-pointer">Forgotten Password</a>
            </div>
            {isError && (
            <div className="bg-red-600 rounded-xl px-3 py-3 border">
              <p>Login Failed, {errorMessage}, please try again</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}