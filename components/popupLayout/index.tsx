"use client";

import { images } from "@/utils/images";
import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";

export interface PopupLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const PopupLayout = ({
    isOpen,
    onClose,
    children,
    className,
}: PopupLayoutProps) => {
    useEffect(() => {
        const trapFocus = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", trapFocus);

        if (isOpen) {
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                (focusableElements[0] as HTMLElement).focus();
            }

            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", trapFocus);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    return (
        <div
            className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-black/10 pb-12 scroll-smooth pt-36 z-50 shadow-2xl"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={clsx(
                    "bg-white rounded-sm shadow-lg p-4 relative",
                    className
                )}
            >
                <button
                    className="p-4 rounded-full cursor-pointer absolute right-0 top-0"
                    onClick={onClose}
                >
                    <Image
                        src={images.CloseIcon}
                        alt="close-icon"
                        className="size-4"
                    />
                </button>
                {children}
            </div>
        </div>
    );
};

export default PopupLayout;
