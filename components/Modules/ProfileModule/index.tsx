"use client";

import NotFound from "@/app/(user)/not-found";
import PostCover from "@/components/postCover";
import { PostProps } from "@/interfaces/post";
import { signOut } from "@/services/authService";
import { useAuthStore } from "@/store/authstore";
import { clearBrowserCookies } from "@/utils/clearBrowserCookies";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileModuleProps {
    post: PostProps[];
    draftPost: PostProps[];
}

const ProfileModule = ({ post, draftPost }: ProfileModuleProps) => {
    const { user } = useAuthStore();
    const { profile } = useParams();
    const router = useRouter();

    const [query, setQuery] = useState("published");

    const selectedPosts = query === "published" ? post : draftPost;

    if (!user) {
        return NotFound();
    }

    const handleLogOut = async () => {
        try {
            const response = await signOut();

            if (response.success) {
                clearBrowserCookies();
                router.push("/");
            }
        } catch (error) {
            console.error("Error on logout API", error);
        }
    };

    return (
        <div className="relative min-h-lvh flex flex-row">
            <div className="w-8/12 border flex border-y-0 border-l-0 px-24 pt-5 border-r-[#e3e3e3]">
                <div className="flex flex-col">
                    <p className="text-[#242424] text-5xl font-semibold">
                        {user.name}
                    </p>
                    <div className="flex flex-col mt-16 items-center space-y-12 mb-12">
                        <div className="flex flex-row items-start justify-baseline gap-x-3 w-full">
                            <p
                                className={clsx(
                                    "cursor-pointer",
                                    query === "published"
                                        ? "border-b border-b-gray-300 font-semibold"
                                        : "border-b-transparent",
                                    "transition-all delay-50"
                                )}
                                onClick={() => setQuery("published")}
                            >
                                Published
                            </p>
                            <p
                                className={clsx(
                                    "cursor-pointer",
                                    query === "draft"
                                        ? "border-b border-b-gray-300 font-semibold"
                                        : "border-b-transparent",
                                    "transition-all delay-50"
                                )}
                                onClick={() => setQuery("draft")}
                            >
                                Draft
                            </p>
                        </div>
                        {selectedPosts.length > 0 ? (
                            selectedPosts.map((post) => (
                                <Link
                                    href={`/${decodeURIComponent(
                                        profile as string
                                    )}/${post.slug}-${post._id}`}
                                    className="relative max-w-8/12 flex flex-col space-y-3"
                                    key={post._id}
                                >
                                    <PostCover
                                        isHeaderShow={false}
                                        postContent={post.content}
                                        likesCount={post.likesCount}
                                        commentsCount={post.commentsCount}
                                        publishedAt={new Date(post.updatedAt)}
                                        title={post.title}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p>No Post found</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex justify-start">
                <div className="px-11 pt-11 flex flex-col space-y-2">
                    <Image
                        src={user.profileImage}
                        alt={`${user.name}-img`}
                        width={100}
                        height={0}
                        className="rounded-full h-[100px]"
                    />
                    <p className="text-base font-semibold text-[#242424]">
                        {user.name}
                    </p>
                    <p className="text-xs text-green-500 mt-3 cursor-pointer hover:text-gray-600">
                        Edit profile
                    </p>
                    <p
                        className="text-xs text-red-500 mt-3 cursor-pointer hover:text-red-600"
                        onClick={handleLogOut}
                    >
                        Log out
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileModule;
