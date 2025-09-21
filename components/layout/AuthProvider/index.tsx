"use client";

import Header from "@/components/layout/header";
import { UserProfileProps } from "@/interfaces/auth";
import { useAuthStore } from "@/store/authstore";
import { clearBrowserCookies } from "@/utils/clearBrowserCookies";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayoutProvider = ({
    children,
    profileDetails,
}: {
    children: React.ReactNode;
    profileDetails: UserProfileProps;
}) => {
    const { isAuthenticated, isLoading, userProfile } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Only check authentication after loading is complete
        if (!isLoading && !isAuthenticated) {
            clearBrowserCookies();
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (profileDetails && profileDetails._id) {
            userProfile(profileDetails);
        }
    }, [userProfile, profileDetails]);

    // Show loading while auth is being verified
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    // Don't render if not authenticated (redirect will happen)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="relative bg-background flex min-h-screen flex-col">
            <Header
                userIcon={profileDetails?.profileImage}
                userName={profileDetails?.name}
            />
            <main className="min-h-80 flex-grow p-0 z-10">{children}</main>
        </div>
    );
};

export default AuthLayoutProvider;
