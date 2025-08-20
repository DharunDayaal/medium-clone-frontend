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