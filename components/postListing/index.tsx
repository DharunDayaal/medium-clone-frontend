import { PostProps } from "@/interfaces/post";
import Link from "next/link";
import PostCover from "../postCover";

interface PostListingProps {
    postData: PostProps[];
}

const PostListing = ({ postData }: PostListingProps) => {
    return (
        <div className="w-full h-full mt-24 px-72">
            <div className="flex flex-col space-y-16 mb-16">
                {postData.map((post) => (
                    <Link
                        href={`post/${post.slug}-${post._id}`}
                        className="relative max-w-7/12 flex flex-col space-y-3"
                        key={post._id}
                    >
                        <PostCover
                            profileImage={post.aurthor.profileImage}
                            aurthorName={post.aurthor.name}
                            title={post.title}
                            postContent={post.content}
                            publishedAt={post.updatedAt}
                            likesCount={post.likesCount}
                            commentsCount={post.commentsCount}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PostListing;
