export interface Author {
    _id: string;
    name: string;
    profileImage: string;
    followersCount: number;
}

export interface Tag {
    _id: string;
    name: string;
    description: string;
}

export interface PostProps {
    _id: string;
    aurthor: Author;
    title: string;
    slug: string;
    content: string;
    tags: Tag[];
    likesCount: number;
    commentsCount: number;
    readTime: number;
    status: "published" | "draft"
    createdAt: null;
    updatedAt: Date;
    __v: null;
}

export interface PostCoverProps {
    isHeaderShow?: boolean
    aurthorName?: string;
    profileImage?: string;
    title: string;
    postContent: string;
    publishedAt: Date;
    likesCount: number;
    commentsCount: number;
}

export interface CommentProps {
    _id: string;
    aurthor: Author;
    content: string;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
    parentCommentId: string | null;
    post: string;
    replies: CommentProps[]
}

export interface TagProps {
    _id: string;
    name: string;
    description: string;
    postCount: number;
    createdAt: string;
    updatedAt: string;
    __v: number
}

export interface NewStoryFormProps {
    values: {
        title: string;
        content: string;
        tags: string[];
    }
    message: string;
    error: {
        title?: string;
        content?: string;
        tags?: string;
    }
}

export interface PostPayloadProps{
    aurthor?: string;
    title: string;
    content: string;
    status?: string;
    tags: string[];
}