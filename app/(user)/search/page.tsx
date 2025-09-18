import SearchModule from "@/components/Modules/SearchModule";
import { Suspense } from "react";

const SearchPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchModule />
        </Suspense>
    );
};

export default SearchPage;
