import AuthLayoutProvider from "@/components/layout/AuthProvider";
import Redirect from "@/components/layout/AuthProvider/Redirect";
import { UserProfileProps } from "@/interfaces/auth";
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
        <Redirect isTrigger={true}>
            <AuthLayoutProvider profileDetails={profileDetails}>
                {children}
            </AuthLayoutProvider>
        </Redirect>
    );
};

export default UserLayout;
