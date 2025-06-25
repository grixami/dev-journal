"use server";

import { getUserNoPass } from "@/utils/prisma/utils/users"

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id =  parseInt(searchParams.get("id"));

    const userData = await getUserNoPass(id)
    return new Response(JSON.stringify(userData), {
        status: 200
    })
}

export async function POST() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405
  })
}