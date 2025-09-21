"use client";

import Button from "@/components/button";
import TagChip from "@/components/tagChip";
import {
    NewStoryFormProps,
    PostPayloadProps,
    TagProps,
} from "@/interfaces/post";
import { editPost } from "@/services/postService";
import { useAuthStore } from "@/store/authstore";
import { usePostState } from "@/store/postStore";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

interface NewStoryModuleProps {
    tags: TagProps[];
}

const EditPostModule = ({ tags }: NewStoryModuleProps) => {
    const blogState: NewStoryFormProps = {
        values: {
            title: "",
            content: "",
            tags: [],
        },
        message: "",
        error: {
            title: "",
            content: "",
            tags: "",
        },
    };
    const { isEditing, post, setIsEditing, reset } = usePostState();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        return () => {
            reset();
        };
    }, [pathname]);

    useEffect(() => {
        return () => {
            if (!post?._id) {
                router.back();
            }
        };
    }, [post]);

    const editingPost: NewStoryFormProps = {
        values: {
            title: post?.title || "",
            content: post?.content || "",
            tags: post?.tags.map((tag) => tag._id) || [],
        },
        message: "",
        error: {
            title: "",
            content: "",
            tags: "",
        },
    };

    const [tagIds, setTagIds] = useState<string[]>(
        isEditing ? editingPost.values.tags : []
    );
    const [state, formAction] = useActionState(handlePostSubmit, blogState);
    const { user } = useAuthStore();

    const handleTags = (tagId: string) => {
        setTagIds((prev) => (prev.includes(tagId) ? prev : [...prev, tagId]));
    };

    async function handlePostSubmit(
        prevState: NewStoryFormProps,
        formData: FormData
    ): Promise<NewStoryFormProps> {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        const error: NewStoryFormProps["error"] = {};

        if (!title || !title.trim()) {
            error.title = "Blog title is required";
        }
        if (!content || !content.trim()) {
            error.content = "Blog content is required";
        }
        if (!tagIds || !(tagIds.length > 0)) {
            error.tags =
                "Select atleast one tag that matches the genre of your blog";
        }

        if (Object.keys(error).length > 0) {
            return {
                error,
                message: "Please clear all the errors",
                values: {
                    title: "",
                    content: "",
                    tags: [],
                },
            };
        }

        const payload: PostPayloadProps = {
            aurthor: user?._id,
            title: title,
            content: content,
            tags: tagIds,
        };

        try {
            const response = await editPost(payload, post?._id || "");

            if (response?.success) {
                setTagIds([]);
                router.back();
                setIsEditing(false);
                reset();
            }
        } catch (error) {
            console.log("Error on editing post", error);
        }

        return {
            values: {
                title: "",
                content: "",
                tags: [],
            },
            message: "",
            error: {},
        };
    }

    return (
        <div className="mt-5 px-96">
            <form action={formAction} className="flex flex-col space-y-2.5">
                <div className="flex flex-col space-y-1.5">
                    <label htmlFor="title" className="font-semibold text-lg">
                        Add your title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        aria-label="title"
                        placeholder="Title"
                        className="outline-none text-lg placeholder:text-lg"
                        defaultValue={isEditing ? editingPost.values.title : ""}
                    />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <label htmlFor="content" className="font-semibold text-lg">
                        Add your content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        cols={30}
                        rows={10}
                        className="outline-none resize-none"
                        placeholder="Tell your story..."
                        defaultValue={
                            isEditing ? editingPost.values.content : ""
                        }
                    ></textarea>
                </div>
                <p className="font-semibold text-lg">Select tags</p>
                <div className="flex flex-row gap-3">
                    {tags.map((tag) => (
                        <TagChip
                            key={tag._id}
                            tagId={tag._id}
                            tagName={tag.name}
                            description={tag.description}
                            onClick={handleTags}
                            isSelected={tagIds.includes(tag._id)}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center">
                    <Button
                        type="submit"
                        name="Submit"
                        buttonStyle="bg-black text-white py-2 px-4 rounded-full hover:text-gray-100 hover:border-white border-transparent w-fit mt-4"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditPostModule;
