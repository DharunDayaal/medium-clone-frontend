export interface ButtonProps {
    name: string;
    onClick?: () => void;
    buttonStyle?: string;
    type?: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
}