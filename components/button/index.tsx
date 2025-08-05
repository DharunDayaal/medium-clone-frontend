import { ButtonProps } from "@/interfaces/component";
import clsx from "clsx";

const Button = ({ name, onClick, buttonStyle }: ButtonProps) => {
    return (
        <button
            className={clsx(
                "bg-black text-white py-2 px-4 rounded-full",
                buttonStyle
            )}
            onClick={onClick}
            role="button"
        >
            {name}
        </button>
    );
};

export default Button;
