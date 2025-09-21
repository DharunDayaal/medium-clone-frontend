export interface ButtonProps {
    name: string;
    onClick?: () => void;
    buttonStyle?: string;
    type?: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
}

export interface InputComponentProps {
    label: string;
    name: string;
    placeholder: string;
    className?: string;
    onChange: (value: string) => void;
    errorText?: string;
    defaultValue?: string;
    totalLength: number;
}

export interface ProfileDetailsProps {
    values: {
        name: string;
        email: string;
        phoneNumber?: string;
        bio?: string;
        website?: string;
        twitter?: string;
        github?: string;
    };
    message?: string;
    error: {
        name?: string;
        email?: string;
        phoneNumber?: string;
        bio?: string;
        website?: string;
        twitter?: string;
        github?: string;
    };
}
