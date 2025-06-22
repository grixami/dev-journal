"use client";
import Head from "next/head";
import NotLoginNav from "../../../../components/NotLoginNav";

export default function Signup() {
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents form from submitting
        alert("TODO");
  };
  return (
    <>
      <Head>
        <title>dev-jornal</title>
        <meta name="description" content="A Blogging Site For Devs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <NotLoginNav/>
      <div className="flex items-center justify-center h-screen">
        <div className="border border-[#3d444d] w-full max-w-xl rounded-2xl bg-[#1d2222] p-6 flex flex-col items-center shadow-[0_0_20px_#3d444d]">
            <h1 className="text-3xl py-3">Sign Up Form</h1>
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
                    <button type="submit"className="mx-auto block border border-[#f0f6fc] px-4 py-2 rounded-lg hover:bg-[#35383d]">Sign Up</button>
                </form>
            </div>
        </div>
      </div>
    </>
  );
}