import { ButtonProps } from "@/interfaces/component";
import clsx from "clsx";

const Button = ({ name, onClick, buttonStyle, type = "button", disabled = false }: ButtonProps) => {
    return (
        <button
            className={clsx(
                "bg-black text-white py-2 px-4 rounded-full",
                "hover:border-2 hover:text-gray-100 hover:border-white border-transparent",
                buttonStyle
            )}
            type={type}
            onClick={onClick}
            role="button"
            disabled={disabled}
        >
            {name}
        </button>
    );
};

export default Button;
