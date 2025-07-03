import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith("/admin")) {
        try {
            const tokenCookie = request.cookies.get("auth_token");
            const token = tokenCookie?.value;
            if (token == null) {
                return NextResponse.redirect(new URL("/", request.url))
            }
            const { payload } = await jwtVerify(token, jwtSecret);
            const isUserAdmin  = payload.isAdmin;
            if(!isUserAdmin) {
                return NextResponse.redirect(new URL("/dashboard", request.url))
            }

            return NextResponse.next()

        } catch (error) {
            console.log(error)
            return NextResponse.redirect(new URL("/logout", request.url))
        }
    } else {
        try {
            const tokenCookie = request.cookies.get("auth_token");
            const token = tokenCookie?.value;
            if (token == null) {
                return NextResponse.redirect(new URL("/auth/login", request.url))
            }

            return NextResponse.next()

            } catch (error) {
                console.log(error)
                return NextResponse.redirect(new URL("/auth/logout", request.url))
            }
    }
}

export const config = {
    matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/post/:path*",
    "/user/:path*",
    "/explore/:path*"
    ]
}