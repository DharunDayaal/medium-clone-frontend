"use client";

import clsx from "clsx";
import { useRef } from "react";
import Button from "../button";

interface CommentTextareaProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onFocused: (value: boolean) => void;
    isFocused: boolean;
}

const CommentTextarea = ({
    value,
    onChange,
    onSubmit,
    isFocused,
    onFocused,
}: CommentTextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className="relative">
            <textarea
                name="parent-comment"
                id="parent-comment"
                cols={48}
                rows={isFocused ? 8 : 2}
                className="bg-gray-100 ml-2 mt-4 rounded-md text-xs text-[#242424] resize-none focus:outline-none px-5 py-3 placeholder:text-sm placeholder:text-gray-400 transition-all ease-in duration-700"
                placeholder="What are your thoughts?"
                aria-label="parent-comment"
                value={value}
                onFocus={() => onFocused(true)}
                onChange={(e) => onChange(e.target.value)}
                ref={textareaRef}
            ></textarea>
            <div
                className={clsx(
                    isFocused
                        ? "absolute flex flex-row right-3 items-center bottom-4 gap-4"
                        : "hidden"
                )}
            >
                <p
                    className="text-[#5e5e5e] text-sm cursor-pointer"
                    onClick={() => onFocused(false)}
                >
                    Cancel
                </p>
                <Button
                    name="Respond"
                    buttonStyle="!w-[78px] rounded-3xl cursor-pointer h-[37px] !bg-[#191919] text-center text-white h-[32] text-sm"
                    onClick={onSubmit}
                />
            </div>
        </div>
    );
};

export default CommentTextarea;
