"use client";

import clsx from "clsx";

interface TagChipProps {
    tagId: string;
    onClick: (value: string) => void;
    tagName: string;
    description?: string;
    isSelected: boolean;
}

const TagChip = ({
    tagId,
    tagName,
    description,
    onClick,
    isSelected,
}: TagChipProps) => {
    return (
        <p
            className={clsx(
                `rounded-3xl border px-4 py-2 cursor-pointer transition-colors duration-300 hover:shadow hover:font-stretch-50%`,
                isSelected
                    ? "bg-gray-100 font-medium border-gray-300 text-black"
                    : "border-gray-100 bg-white text-gray-700"
            )}
            onClick={() => onClick(tagId)}
        >
            {tagName}
        </p>
    );
};

export default TagChip;
