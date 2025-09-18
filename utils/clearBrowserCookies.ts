'use client';

import { deleteCookie } from "cookies-next";

export function clearBrowserCookies() {
    if(typeof window !== 'undefined') {
        deleteCookie("userID")
        deleteCookie("token");

        window.location.reload();
    }
}