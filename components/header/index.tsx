"use client";

import Button from "@/components/button";
import PopupLayout from "@/components/popupLayout";
import usePopupStore from "@/store/loginStore";
import { images } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const { isOpen, setIsOpen } = usePopupStore();

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
                            buttonStyle="font-stretch-condensed"
                            onClick={() => setIsOpen(true)}
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
