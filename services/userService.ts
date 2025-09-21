"use server";

import axiosInstance from "@/helpers/axiosInstance";
import { UpdateProfileProps } from "@/interfaces/auth";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const updateUserProfile = async (body: UpdateProfileProps) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const userId = cookieStore.get("userID")?.value;

        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile/update/${userId}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}