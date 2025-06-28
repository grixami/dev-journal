"use server";
import { createUser, getAuthCode } from "@/utils/prisma/utils/auth";
import { encrypt } from "@/utils/api/stringencryption";

const re = new RegExp("^[a-zA-Z0-9]+$"); // Ensures that the user will not be created, if they change the html to bypass the pattern

export async function POST(request) {

  try {

    let { username, password, email, authcode  } = await request.json();
    let preHashPass = password
    password = encrypt(password)
    
    if(!username || !password || !email || !authcode) {
      return new Response(JSON.stringify({ message: "parameters are missing" }), {
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

    if(password.length < 8) {
      return new Response(JSON.stringify({ message: "Please make your password at least 8 characters long" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    const checkauthcode = await getAuthCode(email)
    
    if(checkauthcode != authcode.trim()) {
      console.log(authcode, checkauthcode)
      return new Response(JSON.stringify({ message: "invalid auth code" }), {
        status: 400
      })
    }

    const newUser = await createUser(username, password, email);

    return new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    let message = "Error creating user"
console.log(error)
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