"use client";

import LoginNav from "@/components/loginnav";
import Head from "next/head";
import SearchUserProfile from "@/components/searchuserprofile"

export default function search() {

    return (
        <>
            <Head>
                <title>dev-journal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="flex flex-col h-screen">
                <LoginNav/>
                <div className="flex overflow-y-auto scrollbar scrollbar-thumb-white ">
                    <div className="flex flex-col space-y-5 mt-10 w-3/5 ml-[10%]">
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                        <SearchUserProfile username="a" bio="b" userId="3"/>
                    </div>
                </div>
            </div>
        </>
    )
}