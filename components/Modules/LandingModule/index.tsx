"use client";

import Button from "@/components/button";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginLayout from "@/components/loginPopup";
import PopupLayout from "@/components/popupLayout";
import usePopupStore from "@/store/loginStore";
import Image from "next/image";

const LandingModule = () => {
    const { isOpen, setIsOpen } = usePopupStore();

    return (
        <>
            <Header userIcon="" userName="" />
            <div className="relative flex flex-col space-y-7">
                <h1 className="w-fit mt-32 ml-36 text-8xl font-bold !font-poppins text-[#242424]">
                    Human <br />
                    Stories &amp; ideas
                </h1>
                <p className="mt-2 ml-36">
                    A place to read, write, and deepen your understanding
                </p>
                <Button
                    name="Start reading"
                    buttonStyle="w-42 ml-36 text-base font-semibold bg-white rounded-full text-[#242424]"
                    onClick={() => setIsOpen(true)}
                />
                <div className="absolute right-0 hidden md:block bg-no-repeat bg-cover bg-right min-h-screen">
                    <Image
                        src={"/clover.webp"}
                        alt="background-image"
                        width={450}
                        height={500}
                    />
                </div>
            </div>
            <Footer />
            {isOpen && (
                <PopupLayout
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="w-6/12"
                >
                    <LoginLayout />
                </PopupLayout>
            )}
        </>
    );
};

export default LandingModule;
