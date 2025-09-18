import { UserProfileProps } from "@/interfaces/auth";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    user: UserProfileProps | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setAuth: (token: string, user: UserProfileProps) => void;
    clearAuth: () => void;
    initializeAuth: () => Promise<void>;
    userProfile: (user: UserProfileProps) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setAuth: (token, user) => {
        set({ token, user, isAuthenticated: true, isLoading: false }),

        setCookie("token", token)
        setCookie("userID", user._id)
    },
    clearAuth: () => {
        set({ token: null, user: null, isAuthenticated: false, isLoading: false })
        deleteCookie("token", { path: '/' });
        deleteCookie("userID", { path: '/' });
    },
    initializeAuth: async () => {
        try {
            const token = getCookie("token")?.toString();
            const userId = getCookie("userID")?.toString();

            if (token && userId) {
                set({
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });
            }
            else {
                console.warn("No token or userID found, clearing auth");
                get().clearAuth();
            }
        } catch (error) {
            console.error("Error initializing the auth", error);
            set({ isLoading: false });
            get().clearAuth();
        }
    },
    userProfile: (user) => {
        set({ user })
    }
}));