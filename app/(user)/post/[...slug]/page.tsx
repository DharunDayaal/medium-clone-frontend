import DisplayPost from "@/components/displayPost";
import { checkFollowing, getPostById } from "@/services/postService";

const PostDisplayPage = async ({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) => {
    const resolved = await params;
    const slug = resolved.slug[0];

    const separatedPostId = slug.split("-").pop();
    let postData;
    if (separatedPostId) {
        try {
            const response = await getPostById(separatedPostId);
            if (response?.success) {
                postData = response.data;
            }
        } catch (error) {
            console.log("Error on Post page", error);
        }
    }

    let isFollowing: boolean = false;
    try {
        const response = await checkFollowing(postData.aurthor._id);

        isFollowing = response.isFollowing;
    } catch (error) {
        console.log("Error on checking follow status", error);
    }
    return (
        <>
            <DisplayPost post={postData} isFollowing={isFollowing} />
        </>
    );
};

export default PostDisplayPage;
