import ProfileModule from "@/components/Modules/ProfileModule";
import { PostProps } from "@/interfaces/post";
import { getAllPostByUser, getDraftPosts } from "@/services/postService";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ profile: string }>;
}): Promise<Metadata> {
    const { profile } = await params;

    return {
        title: `${decodeURIComponent(profile)} - Medium`,
        description: "User's profile page",
    };
}

const ProfilePage = async () => {
    const cookieStrore = await cookies();
    const userId = cookieStrore.get("userID")?.value;

    let postByUser: PostProps[] = [];
    let draftPosts: PostProps[] = [];

    try {
        const [response1, response2] = await Promise.all([
            getAllPostByUser(userId as string),
            getDraftPosts(),
        ]);

        postByUser = response1?.data || [];
        draftPosts = response2?.data || [];
    } catch (error) {
        console.error("Error on Profile page", error);
    }

    return <ProfileModule post={postByUser} draftPost={draftPosts} />;
};

export default ProfilePage;
