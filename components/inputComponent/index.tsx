"use client";
import { InputComponentProps } from "@/interfaces/component";
import clsx from "clsx";

const InputComponent = ({
    label,
    name,
    placeholder,
    className,
    onChange,
    totalLength,
    errorText,
    defaultValue,
}: InputComponentProps) => {
    return (
        <>
            <div className="flex flex-col gap-y-1">
                <label htmlFor={name} className="text-sm">
                    {label}
                </label>
                <input
                    name={name}
                    placeholder={placeholder}
                    className={clsx(
                        "bg-[#F2F2F2] rounded-sm text-[#242424] text-base focus:outline-1 px-3 py-2",
                        className && className
                    )}
                    onChange={(e) => onChange(e.target.value)}
                    defaultValue={defaultValue}
                />
                {errorText && <p>{errorText}</p>}
            </div>
        </>
    );
};

export default InputComponent;
