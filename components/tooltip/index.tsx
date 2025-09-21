"use client";

import clsx from "clsx";
import { useState } from "react";

interface TooltipProps {
    children: React.ReactNode; // element that triggers the tooltip
    text: string; // tooltip text
    position?: "top" | "bottom" | "left" | "right"; // optional position
}

const Tooltip = ({ children, text, position = "top" }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            <div
                className={clsx(
                    "absolute z-10 whitespace-nowrap rounded-lg bg-black px-3 py-1 text-sm text-white transition-opacity duration-200",
                    visible ? "opacity-100" : "opacity-0 pointer-events-none",
                    position === "top" && "-top-9 left-1/2 -translate-x-1/2",
                    position === "bottom" &&
                        "-bottom-8 left-1/2 -translate-x-1/2",
                    position === "left" &&
                        "top-1/2 -left-2 -translate-y-1/2 -translate-x-full",
                    position === "right" &&
                        "top-1/2 -right-2 -translate-y-1/2 translate-x-full"
                )}
            >
                {text}
                <span
                    className={clsx(
                        "absolute w-0 h-0 border-transparent",
                        position === "top" &&
                            "left-1/2 bottom-[-5px] -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black",
                        position === "bottom" &&
                            "left-1/2 top-[-5px] -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-black",
                        position === "left" &&
                            "top-1/2 right-[-5px] -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-black",
                        position === "right" &&
                            "top-1/2 left-[-5px] -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-black"
                    )}
                />
            </div>
        </div>
    );
};

export default Tooltip;
