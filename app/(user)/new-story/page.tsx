import NewStoryModule from "@/components/Modules/NewStoryModule";
import { getAllTags } from "@/services/postService";

const NewStory = async () => {
    let tagsArray;

    try {
        const response = await getAllTags();
        if (response?.success) {
            tagsArray = response.data;
        }
    } catch (error) {
        console.log("Error on getting all tags", error);
    }

    return <NewStoryModule tags={tagsArray} />;
};

export default NewStory;
