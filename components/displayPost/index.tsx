"use client";

import { PostProps } from "@/interfaces/post";
import {
    followUser,
    LikeAndUnlikePost,
    publishPost,
    unfollowUser,
} from "@/services/postService";
import { usePostState } from "@/store/postStore";
import { formatDate } from "@/utils/formatDate";
import { images } from "@/utils/images";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../button";
import CommentSidebar from "../commentSidebar";

interface DisplayPostProps {
    post: PostProps;
    shouldFollow?: boolean;
    isFollowing?: boolean;
    isProfile?: boolean;
}

const DisplayPost = ({
    post,
    shouldFollow = true,
    isProfile = false,
    isFollowing: initialFollowing,
}: DisplayPostProps) => {
    const [isFollowing, setIsFollowing] = useState(initialFollowing ?? false);
    const [isOpen, setIsOpen] = useState(false);
    const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
    const [publish, setPublish] = useState(
        post.status === "draft" ? "Publish" : "Published"
    );
    const { isEditing, setIsEditing, setPost } = usePostState();

    const router = useRouter();

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                const response = await unfollowUser(post.aurthor._id);
                if (response?.success) {
                    setIsFollowing(false);
                }
            } else {
                const response = await followUser(post.aurthor._id);
                if (response?.success) {
                    setIsFollowing(true);
                }
            }
        } catch (error) {
            console.log("Error on follow API", error);
        }
    };

    const handlePostPublish = async () => {
        try {
            const response = await publishPost(post._id);

            if (response?.success) {
                setPublish("Published");
                router.back();
            }
        } catch (error) {
            console.log("Error on publshing the post", error);
        }
    };

    const handleLikePost = async () => {
        try {
            const response = await LikeAndUnlikePost(post._id);
            if (response?.success) {
                if (response.message === "Post liked successfully") {
                    setLikesCount((prev) => prev + 1);
                } else if (response.message === "Post unliked successfully") {
                    setLikesCount((prev) => (prev > 0 ? prev - 1 : 0));
                }
            }
        } catch (error) {
            console.log("Error on like and unlike post", error);
        }
    };

    const handleEditPost = () => {
        setIsEditing(true);
        setPost(post);
        router.push("/new-story");
    };

    return (
        <div className="relative flex flex-col text-justify space-y-6 px-96 pt-12">
            <div className="absolute right-9 top-4 space-x-5">
                <button
                    className={clsx(
                        publish === "Published"
                            ? "bg-green-500 py-2 px-4 rounded-full"
                            : "bg-green-400 hover:bg-green-500 py-2 px-4 rounded-full",
                        "cursor-pointer"
                    )}
                    disabled={publish === "Published"}
                    onClick={handlePostPublish}
                >
                    {publish}
                </button>
                {isProfile && (
                    <button
                        className={clsx(
                            "cursor-pointer hover:underline text-sm"
                        )}
                        onClick={handleEditPost}
                    >
                        {isEditing ? "Editing" : "Edit"}
                    </button>
                )}
            </div>
            <h1 className="text-5xl text-start font-bold text-[#242424]">
                {post.title}
            </h1>
            <div className="flex flex-row items-center space-x-4">
                <Image
                    src={post.aurthor.profileImage}
                    alt={`${post.aurthor.name}-image`}
                    width={40}
                    height={0}
                    className="!h-[40px] rounded-full cursor-pointer"
                />
                <p className="hover:underline cursor-pointer">
                    {post.aurthor.name}
                </p>
                {shouldFollow && (
                    <Button
                        name={isFollowing ? "Following" : "Follow"}
                        buttonStyle="border border-black bg-transparent py-2 px-4 rounded-full text-black hover:bg-black hover:text-white"
                        onClick={handleFollow}
                    />
                )}
                <div className="flex flex-row space-x-1.5">
                    <p className="text-[#6B6B6B] text-xs">
                        {post.readTime} min read
                    </p>
                    <p className="text-[#6B6B6B] text-xs">·</p>
                    <p className="text-[#6B6B6B] text-xs">
                        {formatDate(post.updatedAt)}
                    </p>
                </div>
            </div>
            <div className="border-y-1 border-y-gray-100 px-3.5 py-2 flex flex-row items-center">
                {shouldFollow && (
                    <div className={"flex flex-row gap-x-2"}>
                        <Image
                            src={images.LikeIcon}
                            alt="like-image"
                            width={20}
                            height={20}
                            className={"cursor-pointer"}
                            onClick={handleLikePost}
                        />
                        <span className="text-sm text-[#6B6B6B]">
                            {likesCount}
                        </span>
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-white px-5 py-2.5 rounded-lg border-none focus:border-none cursor-pointer flex flex-row gap-x-2"
                >
                    <Image
                        src={images.CommentIcon}
                        alt="comment-icon"
                        width={20}
                        height={20}
                    />
                    <span className="text-sm text-[#6B6B6B]">
                        {post.commentsCount}
                    </span>
                </button>
            </div>
            <div className="text-xl text-black">{post?.content}</div>
            <CommentSidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                commentsCount={post.commentsCount}
                postId={post._id}
            />
        </div>
    );
};

export default DisplayPost;
