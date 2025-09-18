"use client";

import { useAuthStore } from "@/store/authstore";
import { images } from "@/utils/images";
import Image from "next/image";
import { useEffect } from "react";

export default function AuthInitializer({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useAuthStore();

    useEffect(() => {
        useAuthStore.getState().initializeAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Image src={images.LoadingGif} alt="loading-gif" />
            </div>
        );
    }

    return <>{children}</>;
}
