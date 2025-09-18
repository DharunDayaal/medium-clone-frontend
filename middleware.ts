import { NextRequest, NextResponse } from "next/server";

// Protected routes pattern
const protectedRoutes = [/^\/(user)(\/.*)?$/];

// Middleware function
export async function middleware(request: NextRequest) {
    const { cookies, headers, nextUrl } = request

    const pathname = nextUrl.pathname;

    const userAccessToken = cookies.get("token")?.value;

    // Check if routes require authentication
    const isProtectedRoute = protectedRoutes.some((pattern) => pattern.test(pathname))

    // If no token and user accessing protected routes redirect them to base landing page
    if(!userAccessToken && isProtectedRoute) {
        return NextResponse.redirect(new URL('/', nextUrl.origin))
    }

    // If user logged in redirect them to the home page
    if(userAccessToken && pathname === '/') {
        return NextResponse.redirect(new URL('/home', nextUrl.origin))
    }

    return NextResponse.next({
        request: { headers },
    });
}

// Matcher to exclude specific routes (api, static assets, favicon)
export const config = {
    matcher: ['/((?!api|static|favicon.ico).*)'],
}