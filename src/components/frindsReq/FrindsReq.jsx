import { Input } from "@heroui/react";
import { FiUsers } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { suggestions } from "../../Services/postServices";
import { Link } from "react-router";


const FrindsReq = () => {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        async function getSuggestions() {
            const data = await suggestions();
            console.log(data.data.suggestions);
            setFriends(data.data.suggestions);
        }
  const token = localStorage.getItem("token");
  if (token) {
        getSuggestions();
  }
    }, []);
    return (
        <>

            <aside className="w-75 mx-auto shrink-0 bg-white rounded-3xl shadow-sm border border-gray-200 min-h-[calc(100vh-6rem)] py-4 px-3 flex flex-col">
                <section className="p-4 border-b border-gray-100 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                        <FiUsers className="text-2xl text-[#1f6fe5]" />
                        <h2 className="text-lg font-bold text-gray-800">
                            Suggested Friends
                        </h2>
                    </div>

                    {/* Badge Number */}
                    <span className="bg-[#f1f5f9] text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                        {friends.length}
                    </span>

                </section>
                {friends.length === 0 ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : (
                    <section className="flex-1 flex flex-col min-h-0">
                        <ul className="flex-1 overflow-y-auto px-4 space-y-2">
                            {friends.map((friend) => (
                                <li
                                    key={friend._id}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition"
                                >
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">
                                            <img
                                                src={friend.photo}
                                                alt={friend.name}
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-sm">
                                                    {friend.name?.length <= 8
                                                        ? friend.name
                                                        : friend.name?.slice(0, 8) + "..."}
                                                </h3>
                                                <p className="text-gray-500 text-sm">
                                                    @{friend.username?.length <= 8
                                                        ? friend.username
                                                        : friend.username?.slice(0, 8) + "..."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Follow Button */}
                                        <button className="flex items-center gap-1 px-1 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition">
                                            + Follow
                                        </button>
                                    </div>

                                    {/* Followers Count */}
                                    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full w-fit">
                                        {friend.followersCount || 0} followers
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/suggestions"
                            className="block w-full bg-gray-100  text-center py-2  hover:bg-gray-200 transition mt-3 font-bold"
                        >
                            View All
                        </Link>


                    </section>

                )}
            </aside>

        </>
    )
}

export default FrindsReq