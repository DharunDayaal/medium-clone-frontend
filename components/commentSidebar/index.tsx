"use client";

import { CommentProps } from "@/interfaces/post";
import {
    CreateParentComment,
    CreateReplyComment,
    GetAllCommentsForPost,
    LikeAndUnlikeComment,
} from "@/services/postService";
import { useAuthStore } from "@/store/authstore";
import { formatDate } from "@/utils/formatDate";
import { images } from "@/utils/images";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentTextarea from "../commentTextarea";

interface CommentSidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    commentsCount: number;
    postId: string;
}

interface CommentSectionProps {
    name: string;
    profileImage: string;
    updatedAt: string;
    content: string;
    likesCount: number;
    repliesCount: number;
    replies: CommentProps[];
    commentId: string;
    postId: string;
}

const CommentSection = ({
    name,
    profileImage,
    updatedAt,
    content,
    likesCount,
    repliesCount,
    replies,
    commentId,
    postId,
}: CommentSectionProps) => {
    const { user } = useAuthStore();

    const [originalLikesCount, setOriginalLikesCount] = useState(
        likesCount || 0
    );
    const [showReplies, setShowReplies] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [replyComment, setReplyComment] = useState("");
    const [localReplies, setLocalReplies] = useState<CommentProps[]>(replies);

    const handleSubmitReplyComment = async () => {
        const body = {
            content: replyComment,
        };
        try {
            const response = await CreateReplyComment(commentId, body);
            if (response?.success) {
                const newReply: CommentProps = {
                    _id: "",
                    aurthor: {
                        _id: user?._id || "",
                        name: user?.name || "Unknown",
                        profileImage: user?.profileImage as string,
                        followersCount: 0,
                    },
                    content: replyComment,
                    updatedAt: "",
                    createdAt: "",
                    parentCommentId: commentId,
                    likesCount: 0,
                    replies: [],
                    post: postId,
                };

                setLocalReplies((prev) => [...prev, newReply]);
                setReplyComment("");
                setIsReplying(false);
                setIsFocused(false);
                setShowReplies(true);
            }
        } catch (error) {
            console.log("Error on replying a comment", error);
        }
    };

    const handleCommentLike = async () => {
        try {
            const response = await LikeAndUnlikeComment(commentId);

            if (response?.success) {
                if (response.message === "Comment successfully liked") {
                    setOriginalLikesCount((prev) => prev + 1);
                } else if (
                    response.message === "Comment successfully unliked"
                ) {
                    setOriginalLikesCount((prev) => (prev > 0 ? prev - 1 : 0));
                }
            }
        } catch (error) {
            console.log("Error on liking the comment", error);
        }
    };

    return (
        <div className="flex flex-col space-y-4 mt-3">
            <div className="flex flex-row gap-x-3 items-center">
                <Image
                    src={profileImage}
                    alt="userprofile-image"
                    width={30}
                    height={0}
                    className="rounded-full h-[30px]"
                />
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-[#242424]">
                        {name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {formatDate(updatedAt)}
                    </p>
                </div>
            </div>
            <p className="text-sm text-[#242424]">{content}</p>
            <div className="flex flex-row gap-x-5 items-center">
                <div
                    className="flex flex-row gap-x-2 items-center cursor-pointer"
                    onClick={handleCommentLike}
                >
                    <Image
                        src={images.LikeIcon}
                        alt="like-icon"
                        width={20}
                        height={20}
                    />
                    <p className="text-[#6B6B6B] text-sm">
                        {originalLikesCount}
                    </p>
                </div>
                <div
                    className="flex flex-row gap-x-2 items-center cursor-pointer"
                    onClick={() => setShowReplies(!showReplies)}
                >
                    <Image
                        src={images.CommentIcon}
                        alt="comment-icon"
                        width={20}
                        height={20}
                    />
                    <p className="text-[#6B6B6B] text-sm hover:text-[#242424]">
                        {showReplies ? "Hide replies" : repliesCount}
                    </p>
                </div>
                <p
                    className="text-sm underline cursor-pointer text-[#242424]"
                    onClick={() => setIsReplying((prev) => !prev)}
                >
                    Reply
                </p>
            </div>
            {isReplying && (
                <CommentTextarea
                    value={replyComment}
                    onChange={setReplyComment}
                    onSubmit={handleSubmitReplyComment}
                    onFocused={setIsFocused}
                    isFocused={isFocused}
                />
            )}
            {showReplies && localReplies.length > 0 && (
                <div className="ml-3 px-4 py-6 shadow-[inset_2px_0px_0px_0px_rgba(0,0,0,0.1)] rounded-sm">
                    {localReplies.map((reply) => (
                        <CommentSection
                            name={reply.aurthor.name}
                            profileImage={reply.aurthor.profileImage}
                            updatedAt={reply.updatedAt}
                            content={reply.content}
                            likesCount={reply.likesCount}
                            repliesCount={reply.replies.length}
                            replies={reply.replies}
                            commentId={reply._id}
                            key={reply._id}
                            postId={postId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const CommentSidebar = ({
    isOpen,
    setIsOpen,
    commentsCount,
    postId,
}: CommentSidebarProps) => {
    const { user } = useAuthStore();
    const [respondComment, setRespondComment] = useState("");
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const response = await GetAllCommentsForPost(postId);
                if (response?.success) {
                    setComments(response?.data);
                }
            } catch (error) {
                console.log("Error on fetching comments", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, [isOpen, postId]);

    const handleSubmitComment = async () => {
        const body = {
            content: respondComment,
        };

        try {
            const response = await CreateParentComment(postId, body);
            if (response.success) {
                const newComment: CommentProps = {
                    _id: "",
                    aurthor: {
                        _id: "",
                        followersCount: 0,
                        name: user?.name || "Unknown",
                        profileImage: user?.profileImage as string,
                    },
                    content: body.content,
                    updatedAt: new Date().toISOString(),
                    parentCommentId: null,
                    createdAt: "",
                    likesCount: 0,
                    replies: [],
                    post: postId,
                };

                setComments((prev) => [...prev, newComment]);

                setIsFocused(false);
                setRespondComment("");
            }
        } catch (error) {
            console.log("Error on creating the comment", error);
        }
    };

    return (
        <div
            className={clsx(
                `fixed top-0 right-0 z-40 w-96 h-screen py-12 px-5 overflow-y-auto bg-white transition-transform`,
                isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
            )}
        >
            <div className=" flex flex-row items-baseline justify-between ">
                <h5
                    id="drawer-navigation-label"
                    className="text-xl font-semibold text-[#242424]"
                >
                    Responses ({commentsCount})
                </h5>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500 border-none focus:border-none cursor-pointer text-xl font-semibold p-1.5 rounded-lg"
                >
                    ✕
                </button>
            </div>
            <div className="mt-12">
                <div className="flex flex-row items-center gap-x-2.5">
                    <Image
                        src={user?.profileImage as string}
                        alt="user-image"
                        width={30}
                        height={0}
                        className="rounded-full h-[30px]"
                    />
                    <p className="text-base text-[#242424] font-semibold">
                        {user?.name}
                    </p>
                </div>
                <CommentTextarea
                    value={respondComment}
                    onChange={setRespondComment}
                    onSubmit={handleSubmitComment}
                    onFocused={setIsFocused}
                    isFocused={isFocused}
                />
            </div>
            {isLoading ? (
                <div className="mt-24 flex items-center justify-center">
                    Loading...
                </div>
            ) : (
                <div className="py-2 pl-3">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="mb-4">
                                <CommentSection
                                    name={comment.aurthor.name}
                                    profileImage={comment.aurthor.profileImage}
                                    updatedAt={comment.updatedAt}
                                    content={comment.content}
                                    likesCount={comment.likesCount}
                                    repliesCount={comment.replies.length}
                                    replies={comment.replies}
                                    commentId={comment._id}
                                    key={comment._id}
                                    postId={postId}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-13 font-semibold">
                            Be first to comment this post.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSidebar;
