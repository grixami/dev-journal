"use server";

import {updateUserProfile } from "@/utils/prismautils";
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

const re = new RegExp("^[a-zA-Z0-9]+$");

export async function POST(request) {
    let { bio, pfp, token, username } = await request.json();

    if (!token) {
        return new Response(JSON.stringify({ message: "No token provided" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    if(!re.test(username)) {
        return new Response(JSON.stringify({ message: "Invalid Username, please only use a-z and 0-9" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    if (pfp) {
        const base64String = pfp.includes(",") ? pfp.split(",")[1] : pfp;

        const byteLength = (base64String.length * 3) / 4 - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);

        if (byteLength > 4 * 1024 * 1024) { // 4MB in bytes
            return new Response(JSON.stringify({ message: "Profile picture must be under 4MB" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
            });
        }
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const newdata = await updateUserProfile(decoded.userId, username, bio, pfp)
            

        return new Response(JSON.stringify({message: "sucess"}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({message:"Token auth failed"}), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405
  });
}