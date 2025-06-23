"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cookieExists } from "@/utils/cookies";
import Head from "next/head";
import LoginNav from "@/components/loginnav";

export default function Dashboard() {
    useEffect(() => {
        if (!cookieExists("auth_token")) {
            router.replace("/");
            return;
        }
    });
    return (
        <>
            <Head>
                <title>dev-jornal</title>
                <meta name="description" content="A Blogging Site For Devs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <LoginNav/> 
            </div>
        </>
    );
}