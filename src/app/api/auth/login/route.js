"use server";

import { getUserPassword, usernameToUserID } from "@/utils/prismautils";
import { compare } from "@/utils/api/stringencryption"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
  try {
    let { username, password } = await request.json();
    let userPassword = await getUserPassword(username);

    const passwordMatch = compare(password, userPassword);

    if(!passwordMatch) {
      return new Response(JSON.stringify({ message: "Incorrect Password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
      });
    }

    const userId = await usernameToUserID(username);
    const token = jwt.sign({userId: userId}, jwtSecret);

    return new Response(JSON.stringify({ message: "sucess", token: token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });


  } catch (error) {
    return new Response(JSON.stringify({ message: "Incorrect Password or user does not exist" }), {
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