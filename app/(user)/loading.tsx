import PostSkeleton from "@/components/loader/postSkeletonLoader";

const loading = () => {
    return (
        <>
            <div className="space-y-3">
                {Array(5)
                    .fill("")
                    .map((_, idx) => (
                        <PostSkeleton key={idx} />
                    ))}
            </div>
        </>
    );
};

export default loading;