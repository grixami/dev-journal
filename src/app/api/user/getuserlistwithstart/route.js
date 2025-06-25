import { getUsersStartsWith } from "@/utils/prisma/utils/users"

export async function GET(request) {
    try {
    const { searchParams } = new URL(request.url);
    const usernameSearch = searchParams.get("username");
    const getPfp = searchParams.get("pfp");
    const users = await getUsersStartsWith(usernameSearch, parseInt(getPfp)) 
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