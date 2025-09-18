import { UserProfileProps } from "@/interfaces/auth";
import AuthLayoutProvider from "@/layout";
import { getUserProfile } from "@/services/authService";
import React from "react";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    let profileDetails: UserProfileProps = {
        _id: "",
        name: "",
        email: "",
        phoneNumber: "",
        bio: "",
        profileImage: "",
        followersCount: 0,
        followingCount: 0,
    };

    try {
        const response = await getUserProfile();
        if (response?.success) {
            profileDetails = response?.data as UserProfileProps;
        }
    } catch (error) {
        console.log("Error on getting user profile details", error);
    }

    return (
        <AuthLayoutProvider profileDetails={profileDetails}>
            {children}
        </AuthLayoutProvider>
    );
};

export default UserLayout;
