import PostListing from "@/components/postListing";
import { PostProps } from "@/interfaces/post";
import { getPosts } from "@/services/postService";

export const dynamic = "force-dynamic";

const HomePage = async () => {
    let postData: PostProps[] = [];

    try {
        const response = await getPosts();

        if (response?.data) {
            postData = response.data as PostProps[];
        }
    } catch (error) {
        console.log("Error on post data response", error);
    }

    return (
        <>
            <PostListing postData={postData} />
        </>
    );
};

export default HomePage;
