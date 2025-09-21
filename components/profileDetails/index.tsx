"use client";

import { UpdateProfileProps } from "@/interfaces/auth";
import { ProfileDetailsProps } from "@/interfaces/component";
import { updateUserProfile } from "@/services/userService";
import { useAuthStore } from "@/store/authstore";
import Image from "next/image";
import { useActionState } from "react";
import Button from "../button";
import InputComponent from "../inputComponent";

interface ProfileDetailsComponentProps {
    onClose: (value: boolean) => void;
}

const ProfileDetails = ({ onClose }: ProfileDetailsComponentProps) => {
    const defaultState: ProfileDetailsProps = {
        values: {
            name: "",
            email: "",
            phoneNumber: "",
            bio: "",
            website: "",
            twitter: "",
            github: "",
        },
        message: "",
        error: {
            name: "",
            email: "",
            phoneNumber: "",
            bio: "",
            website: "",
            twitter: "",
            github: "",
        },
    };
    const { user } = useAuthStore();

    const handleFormAction = async (
        prevState: ProfileDetailsProps,
        formData: FormData
    ): Promise<ProfileDetailsProps> => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phoneNumber = formData.get("phone-number") as string;
        const bio = formData.get("bio") as string;

        console.log({
            name,
            email,
            phoneNumber,
            bio,
        });

        const payload: UpdateProfileProps = {
            name,
            email,
            bio,
            phoneNumber,
            profileImage: user?.profileImage as string,
        };

        try {
            const response = await updateUserProfile(payload);
            console.log(
                "UPDATED PROFILE----------------------------",
                response
            );
            if (response?.success) {
                onClose(false);
            } else {
                return {
                    error: {},
                    values: {
                        name,
                        email,
                        phoneNumber,
                        bio,
                    },
                };
            }
        } catch (error) {
            console.log("Error on updating the user profile", error);
        }

        return {
            error: {},
            values: {
                name: "",
                email: "",
                phoneNumber: "",
                bio: "",
                website: "",
                twitter: "",
                github: "",
            },
        };
    };

    const [state, formAction] = useActionState(handleFormAction, defaultState);

    const handleCancelUpdate = () => {
        onClose(false);
    };

    return (
        <div className="px-4 py-2">
            <h4 className="text-center font-medium text-[#242424] text-2xl mt-5">
                Profile Information
            </h4>
            <p className="text-base text-[#6B6B6B]">Photo</p>
            <div className="flex flex-row gap-x-10 items-center">
                <Image
                    src={user?.profileImage as string}
                    alt="user-image"
                    width={96}
                    height={0}
                    className="rounded-full h-[80px]"
                />
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-row gap-x-4">
                        <p className="text-base text-green-700 cursor-pointer">
                            Update
                        </p>
                        <p className="text-base text-red-500 cursor-pointer">
                            Remove
                        </p>
                    </div>
                    <p className="text-base text-[#6B6B6B]">
                        Recommended: Square JPG, PNG, or GIF, at least 1,000
                        pixels per side.
                    </p>
                </div>
            </div>
            <form action={formAction} className="space-y-9 mt-6">
                <InputComponent
                    label="Name*"
                    name="name"
                    onChange={() => {}}
                    placeholder="your name..."
                    defaultValue={user?.name}
                    totalLength={50}
                    errorText={state.error.name}
                />
                <InputComponent
                    label="Email"
                    name="email"
                    onChange={() => {}}
                    placeholder="your email..."
                    defaultValue={user?.email}
                    totalLength={50}
                    errorText={state.error.email}
                />
                <InputComponent
                    label="Short bio"
                    name="bio"
                    onChange={() => {}}
                    placeholder="about yourself..."
                    totalLength={50}
                    errorText={state.error.bio}
                    className="!h-20 !placeholder:text-start"
                />
                <InputComponent
                    label="Phone number"
                    name="phone-number"
                    onChange={() => {}}
                    placeholder="your number"
                    totalLength={50}
                    errorText={state.error.phoneNumber}
                />
                <div className="flex flex-row-reverse gap-x-2 mt-12">
                    <Button
                        name="Save"
                        type="submit"
                        buttonStyle="rounded-full px-4 py-2 text-white bg-green-700 hover:bg-green-800"
                    />
                    <Button
                        name="Cancel"
                        buttonStyle="border border-green-700 rounded-full px-4 py-2 text-green-700 hover:text-green-800 hover:border-green-800"
                        onClick={handleCancelUpdate}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProfileDetails;
