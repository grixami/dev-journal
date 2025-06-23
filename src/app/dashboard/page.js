"use client";

import { getUserNoPass } from "@/utils/prismautils";
import { Asap_Condensed, Sankofa_Display } from "next/font/google";
import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookies";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const authToken = getCookie("auth_token")
    })
}