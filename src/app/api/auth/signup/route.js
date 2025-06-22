"use server";

// TODO, rate limiting

import { CreateUser } from "@/utils/PrismaUtils";
import { encrypt  } from "@/utils/api/stringencryption";

export async function POST(request) {
  try {
    
    let { username, password } = await request.json();

    password = await encrypt(password)

    if(!username || !password) {
      return new Response(JSON.stringify({ message: "Username Or Password not in form" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    await CreateUser(username, password);

    return new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    let message = "Error creating user"

    if (error.message === "Username exists already") {
      message = "Username already exists"
    }

    return new Response(JSON.stringify({ message: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  }
}

export async function GET() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405
  })
}