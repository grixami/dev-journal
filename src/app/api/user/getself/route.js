"use server";

import { getUserNoPass } from "@/utils/prismautils";

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret)
      const userdata = await getUserNoPass(decoded.userId);
      return new Response(JSON.stringify(userdata), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({message:"Token auth failed"}), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
}

export async function POST() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}