"use server";

const jwt = require("jsonwebtoken")
import { encrypt } from "@/utils/api/stringencryption";
import { updateUserPassword } from "@/utils/prismautils";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(request) {
    let {password, token} = await request.json();
    
    if(password.length < 8) {
        return new Response(JSON.stringify({message: "Password must be longer than 8 letters"}), {
            status: 500
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        password = encrypt(password);
        const newUser = updateUserPassword(decoded.userId, password)
        return new Response(JSON.stringify({message: "Sucess"}), {
            status: 200
        }); 
    } catch(error) {
        return new Response(JSON.stringify({message: "Internal Sevrer Error, please contact contactgrixami@gmail.com"}), {
            status: 500
        }); 
    }
}


export async function GET() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405
  });
}