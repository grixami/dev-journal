"use server";
import { createUser } from "@/utils/prismautils";
import { encrypt } from "@/utils/api/stringencryption";

const re = new RegExp("^[a-zA-Z0-9]+$"); // Ensures that the user will not be created, if they change the html to bypass the pattern

export async function POST(request) {

  try {

    let { username, password } = await request.json();
    let preHashPass = password
    password = encrypt(password)

    if(!username || !password) {
      return new Response(JSON.stringify({ message: "Username Or Password not in form" }), {
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

    if(preHashPass.length < 8) {
      return new Response(JSON.stringify({ message: "Please make your password at least 8 characters long" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    await createUser(username, password);

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