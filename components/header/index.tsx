"use client";

import Button from "@/components/button";
import { images } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PopupLayout from "../popupLayout";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="px-16 py-6 border border-b-2 border-b-black">
            <div className="flex justify-between">
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
                    <ul className="flex flex-row space-x-14 items-center">
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
                        <Link
                            href={""}
                            className="text-base font-inter"
                            prefetch
                        >
                            Write
                        </Link>
                        <Link href={""} className="text-base font-inter">
                            Sign in
                        </Link>
                        <Button
                            name="Get started"
                            onClick={() => setIsOpen(true)}
                        />
                    </ul>
                </div>
            </div>
            {
                isOpen && (
                    <PopupLayout isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-96">
                        <div>Hello there</div>
                    </PopupLayout>
                )
            }
        </div>
    );
};

export default Header;
