import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router";
import { suggestions } from "../../Services/postServices";
import { FiUserPlus } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { Input } from "@heroui/react";
import { CiSearch } from "react-icons/ci";
const Suggestions = () => {
    const [friends, setFriends] = useState([]);
    const [limit, setLimit] = useState(20);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        async function getSuggestions() {
            const data = await suggestions(limit);
            setFriends(data.data.suggestions);
            if (friends.length < 60) {
                setHasMore(true);
            }
        }
    
        getSuggestions();
    }, [limit]);

    console.log(friends)
    return (
        <>
            <div className="flex flex-col items-center min-h-[80vh] bg-[#f0f2f5] gap-6 py-6">

                {/* back button */}
                <div className="self-start ml-[15%]">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
                    >
                        <FiArrowLeft />
                        <span>Back to feed</span>
                    </Link>
                </div>

                {/* container */}
                <div className="w-[70%] bg-white rounded-3xl shadow-2xl   p-6">

                    <div className="flex justify-between items-center ">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span> <FiUsers className="text-2xl text-[#1877f2] " /></span>
                            All Suggested Friends
                        </h2>
                        <div className="mr-3 bg-gray-300 flex justify-center items-center w-8 text-[#45556c] font-bold rounded-xl"><h2>{friends.length}</h2></div>
                    </div>
                    <Input
                        classNames={{
                            base: "w-full h-15",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper:
                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20  mb-5",
                        }}
                        placeholder="Type to search..."
                        startContent={<CiSearch size={23} />}
                        size="lg"
                        type="search"
                    />
                    {/* grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {friends.map((friend) => (
                            <div
                                key={friend._id}
                                className="flex items-center justify-between border-gray-500 shadow-sm rounded-xl p-4 hover:bg-gray-50"
                            >
                                {/* user info */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={friend.photo}
                                        alt={friend.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="font-semibold">{friend.name}</h3>
                                        <p className="text-gray-500 text-sm">
                                            @{friend.username}
                                        </p>

                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                {friend.followersCount || 0} followers
                                            </span>
                                            {friend.mutualFollowersCount > 0 && (
                                                <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                                                    {friend.mutualFollowersCount} mutual
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* follow button */}
                                <button className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100">
                                    <FiUserPlus />
                                    Follow
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* load more */}
                    <div className="w-full flex justify-center items-center mt-3">
                    <button
                        disabled={!hasMore}
                        onClick={() => setLimit((prev) => prev + 20)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400 "
                    >
                        Load More
                    </button>
</div>
                </div>
            </div >
        </>
    );
};

export default Suggestions;