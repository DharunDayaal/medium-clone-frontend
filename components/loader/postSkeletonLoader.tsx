const PostSkeleton = () => {
    return (
        <div className="animate-pulse p-4 rounded-md border border-gray-200 max-w-2xl mx-auto">
            {/* Author section */}
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Title */}
            <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>

            {/* Description */}
            <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>

            {/* Footer (date, icons) */}
            <div className="flex items-center space-x-4 mt-4">
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
                <div className="h-4 w-6 bg-gray-300 rounded"></div>
                <div className="h-4 w-6 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default PostSkeleton;
