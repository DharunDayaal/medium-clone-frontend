'use client';

import { useSearchParams } from "next/navigation";

const SearchModule = () => {

    const searchParams = useSearchParams()

    console.log("QUERY--------------------------------", searchParams.get("q"));

    return (
        <div>
            <div></div>
        </div>
    );
};

export default SearchModule;
