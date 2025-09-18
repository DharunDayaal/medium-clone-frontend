import { PostCoverProps } from "@/interfaces/post";
import { images } from "@/utils/images";
import Image from "next/image";

const PostCover = ({
    profileImage,
    aurthorName,
    title,
    postContent,
    publishedAt,
    likesCount,
    commentsCount,
    isHeaderShow = true,
}: PostCoverProps) => {
    const truncateText = (text: string, wordLimit: number) => {
        if (!text) return "";
        const word = text.split(/\s+/);

        if (word.length <= wordLimit) {
            return text;
        }

        const truncatedWords = word.slice(0, wordLimit);
        return truncatedWords.join(" ") + "...";
    };

    const getMonthAndDate = (date: Date) => {
        const publishedDate = new Date(date);
        const month = publishedDate.toLocaleString("default", {
            month: "short",
        });

        return (month + " " + publishedDate.getDate()) as string;
    };

    return (
        <>
            <div className="space-y-4">
                {isHeaderShow && (
                    <div className="flex flex-row space-x-4 items-center">
                        <Image
                            src={profileImage as string}
                            alt="user-profile"
                            className="h-[30px] rounded-full"
                            width={30}
                            height={0}
                        />
                        <p className="text-xs hover:underline">{aurthorName}</p>
                    </div>
                )}
                <div className="flex flex-col space-y-1.5 items-start">
                    <h2 className="w-6/6 text-3xl font-bold">{title}</h2>
                    <p className="w-5/6 text-xs text-gray-400">
                        {truncateText(postContent, 16)}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row space-x-5">
                        <p className="text-xs text-gray-500">
                            {getMonthAndDate(publishedAt)}
                        </p>
                        {isHeaderShow && (
                            <>
                                <div className="flex flex-row items-center w-fit space-x-1">
                                    <Image src={images.LikeIcon} alt="like" />
                                    <p className="text-xs text-gray-500">
                                        {likesCount}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center w-fit space-x-1">
                                    <Image
                                        src={images.CommentIcon}
                                        alt="like"
                                    />
                                    <p className="text-xs text-gray-500">
                                        {commentsCount}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostCover;
