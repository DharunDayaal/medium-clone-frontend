"use server";

import axiosInstance from "@/helpers/axiosInstance";
import { LoginProps } from "@/interfaces/auth";
import { clearBrowserCookies } from "@/utils/clearBrowserCookies";
import { Axios, AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function SignUp(payload: LoginProps) {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-up`, payload)
        return response.data
    } catch (error) {
        return { success: false, error: (error as AxiosError).message } 
    }
}

export async function SignIn(payload: LoginProps) {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-in`, payload)
        return response.data
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export async function getUserProfile() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        const userId = cookieStore.get("userID")?.value;
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile/${userId}`, {
            headers: {
                ...(token ? {Authorization:`Bearer ${token}`} : {}),
            }
        })

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError
        if(axiosError.status === 401) {
            const cookieStore = await cookies();
            cookieStore.delete("token");
            cookieStore.delete("userID");
            clearBrowserCookies();
            redirect('/')
        }
        return { success: false, error: (error as AxiosError).message }
    }
}

export async function signOut() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/sign-out`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.data.success) {
            cookieStore.delete("token");
            cookieStore.delete("userID");
        }

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}