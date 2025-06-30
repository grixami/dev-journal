"use client";
import Head from "next/head";
import NotLoginNav from "@/components/notloginnav";
import TransparrentLoadingGif from "@/components/gif/transparrentloadinggif";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieExists } from "@/utils/cookies";

export default function Signup() {
    const router = useRouter();

    const [isRegistered, setIsRegistered] = useState(false);
    const [isRegistrationFailed, setIsRegistrationFailed] = useState(false);
    const [failMessage, setFailMessage] = useState(""); // starts as empty string
    const [submitted, setSubmitted] = useState(false)
    const [stage, setStage] = useState(0)

    const [authSent, setAuthSent] = useState(false)
    const [authLoading, setAuthLoading] = useState(false)
    const [authErrorMessage, setAuthErrorMessage] = useState("")

    const [checkCodeLoading, setCheckCodeLoading] = useState(false)

    const [submitAuthErrorMessage, setSubmitAuthErrorMessage] = useState("")

    const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
    
    useEffect(() => {
      if(cookieExists("auth_token")) {
          router.replace("/");
      }

    }, [router]);

    const submitEmail = async () => {
      setAuthLoading(true)
        const emailElement = document.getElementById("email")
        if (!emailElement) {
          setAuthLoading(false)
          return
        }

        const email = emailElement.value;
        if(!isValidEmail(email)) {
          setAuthErrorMessage("Invalid email")
          setAuthLoading(false)
          return
        }
        try {
          const resp = await fetch("/api/auth/sendauth", {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
          })

          if(resp.status != 200) {
            setAuthLoading(false)
            const data = await resp.json()
            setAuthErrorMessage(data.message)
            if(resp.status == 429) {
              setAuthErrorMessage("Try again in 60s, each user gets one email per 60s, this time will not update untill the gos is up")
            }
            return
          }
          setAuthSent(true)
          setAuthLoading(false)
          setAuthErrorMessage("")
        } catch(error) {
            setAuthLoading(false)
        }
    }

    const checkAuthCode = async () => {
      setCheckCodeLoading(true)
      const emailElement = document.getElementById("email")
      const authcodeElement = document.getElementById("authCode")
      if (!emailElement || !authcodeElement) {
        
        return
      }

      const email = emailElement.value;
      if(!isValidEmail(email)) {
        setSubmitAuthErrorMessage("Invalid email")
        setCheckCodeLoading(false)
        return
      }
      const code = authcodeElement.value
      const resp = await fetch("/api/auth/checkauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          code: code
        })
      })
      if(resp.status != 200) {
        const data = await resp.json()
        setSubmitAuthErrorMessage(data.message)
        setCheckCodeLoading(false)
        if(resp.status == 429) {
          setAuthErrorMessage("You have been rate-limited, try again later")
        }
        return
      }
      setSubmitAuthErrorMessage("")
      setStage(1)
      setCheckCodeLoading(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents form from submitting
        setSubmitted(true)
        setIsRegistered(false)
        setIsRegistrationFailed(false)
        const username = e.target.username.value;
        const password = e.target.password.value


        try {
          const resp = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              email: email,
              authcode: authCode
            }),
          })
          if(resp.status == 200) {
            setIsRegistered(true)
          } else {
            const data = await resp.json()
            setIsRegistrationFailed(true)
            
            setFailMessage(data.message)
            if(resp.status == 429) {
                setErrorMsg("You have been rate-limited, try again later")
            }
          }
        } catch(error) {
          console.error("Error during signup:", error);
        }
        setSubmitted(false)

    };
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
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
      {stage == 0 ? (
      <div className="flex items-center justify-center">
        <div className="border border-[#3d444d] w-full max-w-xl rounded-2xl bg-[#1d2222] p-6 flex flex-col items-center shadow-[0_0_20px_#3d444d] my-60">
            <h1 className="text-3xl py-3">Sign Up Form</h1>
            <div className="h-[2px] bg-[#3d444d] w-full"></div>    
            <div className="py-2">
                <label className="block mb-2" htmlFor="email">email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required
                    className="w-full mb-4 rounded-md p-2 bg-[#1a1f21] border border-[#3d444d] focus:outline-none focus:border-[#5a9ef9] "
                    onChange={e => setEmail(e.target.value)}

                />

                {!authLoading ? (
                <div>
                <button className="bg-black border-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer p-2 rounded-3xl"

                onClick={() => submitEmail()}>
                  <p>Send auth code</p>
                </button>
                {authErrorMessage.length > 0 && (
                  <div className="mt-2">
                    <p className="bg-red-500 w-auto inline-block p-2 rounded-3xl border-2">Error: {authErrorMessage}</p>
                  </div>
                )}
                </div>
                ) : (
                  <TransparrentLoadingGif/>
                )}

                {authSent && (
                  <div className="mt-3">
                    <label className="block mb-2" htmlFor="authCode">Auth code</label>
                    <input type="authCode" id="authCode" name="authCode" placeholder="Enter your auth code from your inbox" required
                    className="w-full mb-4 rounded-md p-2 bg-[#1a1f21] border border-[#3d444d] focus:outline-none focus:border-[#5a9ef9]"
                    onChange={e => setAuthCode(e.target.value)}
                    />
                    {!checkCodeLoading ? (
                    <div>
                      <button className="bg-black border-2 transition-transform duration-300 hover:scale-105 hover:cursor-pointer p-2 rounded-3xl "
                      onClick={() => checkAuthCode()}>
                      <p>Submit and go to next stage</p>
                      </button>
                      {submitAuthErrorMessage.length > 0 && (
                      <div className="mt-2">
                        <p className="bg-red-500 w-auto inline-block p-2 rounded-3xl border-2">Error: {submitAuthErrorMessage}</p>
                      </div>
                      )}

                    </div>
                    ) : (
                    <TransparrentLoadingGif/>
                    )}

                  </div>
                  
                )}
                
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
      ) : stage == 1 ? (
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
                    {submitted ? (
                      <TransparrentLoadingGif className="mx-auto block"/>
                    ) : (
                      <button type="submit"className="mx-auto block border border-[#f0f6fc] px-4 py-2 rounded-lg hover:bg-[#35383d] hover:cursor-pointer">Sign Up</button>
                    )}
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
      ) : (
        <p>invalid ts</p>
      )}
      
      </div>
    </>
  );
}