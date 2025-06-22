"use server";

export async function POST() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405
  })
}

export async function GET() {
  return new Response(JSON.stringify({message: "Method not allowed"}), {
    status: 405
  })
}