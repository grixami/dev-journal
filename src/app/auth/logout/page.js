"use client";
import Head from "next/head";
import NotLoginNav from "@/components/notloginnav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieExists } from "@/utils/cookies";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        document.cookie.split(";").forEach(function(cookie) {
            const name = cookie.split("=")[0].trim();
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });

        router.replace("/");

    }, [router]);
  return (
    <>
    </>
  );
} 