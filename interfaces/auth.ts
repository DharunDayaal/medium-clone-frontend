export interface LoginState {
    values: {
        name?: string;
        email: string;
        password: string;
    };
    message: string;
    error: {
        name?: string;
        email?: string;
        password?: string;
    };
    
}

export interface LoginProps {
    name?: string;
    email: string;
    password: string;
}

export interface UserProfileProps {
    _id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    bio?: string;
    profileImage: string;
    followersCount?: number;
    followingCount?: number;
    socialLinks?: {
        website?: string;
        twitter?: string;
        github?: string;
    }
    createdAt?: null;
    updatedAt?: null;
    __v?: null;
}