import DisplayPost from "@/components/displayPost";
import { getPostById } from "@/services/postService";

type PageProps = {
    params: Promise<{ profile: string; slug: string }>;
};

const UserPostPage = async ({ params }: PageProps) => {
    const slug = (await params).slug;

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
    return (
        <>
            <DisplayPost
                post={postData}
                shouldFollow={false}
                isProfile={true}
            />
        </>
    );
};

export default UserPostPage;
