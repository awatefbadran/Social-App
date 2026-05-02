import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { suggestions } from "../../Services/postServices";
import { FiArrowLeft, FiUserPlus, FiUsers } from "react-icons/fi";
import { Input } from "@heroui/react";
import { CiSearch } from "react-icons/ci";

const Suggestions = () => {
  const [friends, setFriends] = useState([]);
  const [limit, setLimit] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loadingUser, setLoadingUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getSuggestions() {
      try {
        const data = await suggestions(limit);
        const list = data.data.suggestions || [];

        setFriends(list);
        if (list.length < limit) setHasMore(false);
      } catch (err) {
        console.log(err);
      }
    }

    getSuggestions();
  }, [limit]);

  const toggleFollow = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      setLoadingUser(userId);

      const res = await axios.put(
        `https://route-posts.routemisr.com/users/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const isFollowing = res.data?.data?.following;

      setFollowing((prev) =>
        isFollowing
          ? [...prev, userId]
          : prev.filter((id) => id !== userId)
      );
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoadingUser(null);
    }
  };

  const filteredFriends = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-3 md:px-6 flex flex-col items-center gap-5">

      <div className="w-full max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-100 text-sm"
        >
          <FiArrowLeft />
          Back
        </Link>
      </div>

   
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-4 md:p-6">

     
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <FiUsers className="text-blue-600" />
            Suggested Friends
          </h2>

          <span className="bg-gray-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
            {filteredFriends.length}
          </span>
        </div>

   
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          classNames={{
            base: "w-full",
            inputWrapper: "bg-gray-100 mb-4",
          }}
          placeholder="Search by name or username..."
          startContent={<CiSearch size={18} />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center justify-between border rounded-xl p-3 hover:shadow-sm transition bg-gray-50"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={friend.photo}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold truncate">
                    {friend.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    @{friend.username}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(friend._id)}
                disabled={loadingUser === friend._id}
                className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition shrink-0
                  ${
                    following.includes(friend._id)
                      ? "bg-gray-200 text-gray-700"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }
                `}
              >
                <FiUserPlus size={14} />
                {loadingUser === friend._id
                  ? "..."
                  : following.includes(friend._id)
                  ? "Following"
                  : "Follow"}
              </button>
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No users found
          </p>
        )}

  
        <div className="flex justify-center mt-5">
          <button
            disabled={!hasMore}
            onClick={() => setLimit((prev) => prev + 20)}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;