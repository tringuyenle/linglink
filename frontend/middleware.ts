import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'vi'],

    // Used when no locale matches
    defaultLocale: 'en',
    localePrefix: 'never'
});

export const config = {
    // Match only internationalized pathnames
    // matcher: ['/((?!api|_next|_vercel\\..*).*)']
    matcher: ['/((?!api|_next|.*\\..*).*)']
    // matcher: ['/', '/(vi|en)/:path*']
};