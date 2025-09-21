"use client";

import Button from "@/components/button";
import usePopupStore from "@/store/loginStore";
import { images } from "@/utils/images";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface HeaderProps {
    userIcon: string;
    userName: string;
}

const ProtectedRoutesHeader = ({ userIcon, userName }: HeaderProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams({ q: searchQuery.trim() });
            // replace %20 with +
            const queryString = params.toString().replace(/%20/g, "+");
            router.push(`/search?${queryString}`);
        }
    };

    const handleProfileRoute = () => {
        const modifiedName = userName.replace(" ", "").toLowerCase();
        router.push(`/@${modifiedName}`);
    }

    return (
        <>
            <div className="px-6 py-3.5 flex justify-between items-center shadow-2xs">
                <div className="flex space-x-8 items-center">
                    <Link href={"/home"}>
                        <Image
                            src={images.icon}
                            alt="icon"
                            height={100}
                            width={110}
                            priority
                            quality={100}
                        />
                    </Link>
                    <div className="flex space-x-3 items-center">
                        <Image src={images.SearchIcon} alt="search-img" />
                        <input
                            inputMode="search"
                            onChange={handleSearchQuery}
                            placeholder="Search"
                            value={searchQuery}
                            className="placeholder-gray-800 placeholder:text-xs placeholder:font-semibold text-xs px-2 py-0 rounded-lg focus:outline-0"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-around space-x-12">
                    <Link href="/new-story" prefetch={true}>
                        <Image src={images.WriteIcon} alt="write-icon" />
                    </Link>
                    <Link href="/home" prefetch={true}>
                        <Image src={images.NotifyIcon} alt="notify-icon" />
                    </Link>
                    <Image
                        src={userIcon}
                        alt="user-img"
                        width={30}
                        height={0}
                        className="rounded-full !h-[30px] cursor-pointer"
                        onClick={handleProfileRoute}
                    />
                </div>
            </div>
        </>
    );
};

const PreUserHeader = () => {
    const { setIsOpen } = usePopupStore();
    return (
        <div className="px-28 py-6 border-b-2 border-b-black">
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <Image
                        src={images.icon}
                        alt="icon"
                        height={100}
                        width={120}
                        priority
                        quality={100}
                    />
                </Link>
                <div>
                    <ul className="flex flex-row space-x-14 items-center font-poppins text-base font-stretch-condensed">
                        <Link
                            href={""}
                            className="text-base font-inter"
                            prefetch
                        >
                            Our story
                        </Link>
                        <Link
                            href={""}
                            className="text-base font-inter"
                            prefetch
                        >
                            Membership
                        </Link>
                        <div
                            className="text-base font-inter cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            Write
                        </div>
                        <div
                            className="text-base font-inter cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            Sign in
                        </div>
                        <Button
                            name="Get started"
                            buttonStyle="font-stretch-condensed text-base font-medium bg-black rounded-full text-white rounded-full px-4 py-2 hover:text-gray-200 cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Header = ({ userIcon, userName }: HeaderProps) => {
    const isToken: string | undefined = getCookie("token")?.toString();

    return (
        <>
            {isToken ? (
                <ProtectedRoutesHeader
                    userIcon={userIcon}
                    userName={userName}
                />
            ) : (
                <PreUserHeader />
            )}
        </>
    );
};

export default Header;
