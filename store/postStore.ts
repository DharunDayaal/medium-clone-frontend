import { PostProps } from "@/interfaces/post";
import { create } from "zustand";

interface PostState {
    isEditing: boolean;
    post: PostProps | null;
    setPost: (post: PostProps) => void;
    setIsEditing: (isEditing: boolean) => void;
    reset: () => void;
}

export const usePostState = create<PostState>((set) => ({
    isEditing: false,
    post: null,
    setPost: (post) => {
        set({ isEditing: true, post })
    },
    setIsEditing: (isEditing) => {
        set({ isEditing })
    },
    reset: () => {
        set({ isEditing: false, post: null })
    }
}))