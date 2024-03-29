import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'vi'],

    // Used when no locale matches
    defaultLocale: 'vi',
    localePrefix: 'never'
});

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let isAuth = request.cookies.has('accessToken') // => true
    const { pathname } = request.nextUrl
    if (isAuth && (pathname === "/login" || pathname === "/signin"))
        request.nextUrl.pathname = "/"
    else if (!isAuth && (pathname === "/")) {
        request.nextUrl.pathname = "/login"
        request.nextUrl.href = `http:localhost:3005/login`
    }
    return intlMiddleware(request)
    // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    // Match only internationalized pathnames
    // matcher: ['/((?!api|_next|_vercel\\..*).*)']
    matcher: ['/((?!api|_next|.*\\..*).*)']
    // matcher: ['/', '/(vi|en)/:path*']
};