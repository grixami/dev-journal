import { getUsersStartsWith } from "@/utils/prismautils";

export async function GET(request) {
    try {
    const { searchParams } = new URL(request.url);
    const usernameSearch = searchParams.get("username");
    const users = await getUsersStartsWith(usernameSearch, false) 
    return new Response(JSON.stringify(users), {
        status: 200
    })
    } catch (error) {
        return new Response(JSON.stringify({message: "Internal Server Error"}), {
            status: 500
        })
    }
}

export async function POST() {
    return new Response(JSON.stringify({message: "method not allowed"}), {
        status: 405
    })
}