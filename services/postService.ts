'use server';

import axiosInstance from "@/helpers/axiosInstance";
import { PostPayloadProps } from "@/interfaces/post";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const getPosts = async () => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        return { success: false, error: (error as AxiosError).message }
    }
}

export const getPostById = async (postId: string) => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
        }
}

export const followUser = async (userId?: string) => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;

        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/follow/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const unfollowUser = async (userId: string) => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;

        const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/follow/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const checkFollowing = async (userId: string) => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/follow/${userId}/check`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const getAllPostByUser = async (userId: string) => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const LikeAndUnlikePost = async (postId: string) => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value;
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const GetAllCommentsForPost = async (postId: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value

        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comment/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const LikeAndUnlikeComment = async (commentId: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comment/like/${commentId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const CreateParentComment = async (postId: string, body: { content: string }) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comment/create/${postId}`, 
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const CreateReplyComment = async (parentCommentId: string, body: { content: string }) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comment/create/${parentCommentId}/replies`, 
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const getAllTags = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tag`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const createPost = async (body: PostPayloadProps) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/create`, 
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const getDraftPosts = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/drafts`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const publishPost = async (postId:string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/publish/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}

export const editPost = async (body: PostPayloadProps, postId: string) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const response = await axiosInstance.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/post/update/${postId}`, 
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data;
    } catch (error) {
        return { success: false, error: (error as AxiosError).message }
    }
}