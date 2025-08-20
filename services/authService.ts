"use server";

import axiosInstance from "@/helpers/axiosInstance";
import { LoginProps } from "@/interfaces/auth";
import { AxiosError } from "axios";

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