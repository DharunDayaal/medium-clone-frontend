import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative bg-background flex min-h-screen flex-col">
            <main className="min-h-80 flex-grow px-4 z-10">{children}</main>
        </div>
    );
};

export default UserLayout;
