"use client";

import { getCookie } from "cookies-next";
import React, { useEffect } from "react";

export default function Redirect({
    children,
    isTrigger,
}: {
    children: React.ReactNode;
    isTrigger: boolean;
}) {
    const token = getCookie("token");

    useEffect(() => {
        if (!token && isTrigger) {
            console.log("Yes in logout");
            window.location.href = "/";
            // window.location.reload();
        }
    }, [token]);
    return <>{children}</>;
}
