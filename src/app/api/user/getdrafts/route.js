"use server";

import { getPostDrafts } from "@/utils/prismautils";

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    try {
      const decoded = jwt.verify(token, jwtSecret)
      
      const id = decoded.userId
      const posts = await getPostDrafts(parseInt(id))

      return new Response(JSON.stringify({posts}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({message: "Internal server error"}), {
        status: 500,
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
