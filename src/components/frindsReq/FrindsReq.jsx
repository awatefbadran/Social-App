import { FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";
import { suggestions } from "../../Services/postServices";
import { Link } from "react-router";
import axios from "axios";

const FrindsReq = () => {
  const [friends, setFriends] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loadingUser, setLoadingUser] = useState(null);

  useEffect(() => {
    async function getSuggestions() {
      const data = await suggestions();
      setFriends(data.data.suggestions);
    }

    const token = localStorage.getItem("token");
    if (token) getSuggestions();
  }, []);

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

  return (
    <aside className="
      w-full 
      max-w-[280px] 
      lg:max-w-[260px] 
      xl:max-w-[300px]
      bg-white 
      rounded-2xl 
      shadow-sm 
      flex flex-col 
      h-fit
      shrink-0
    ">

      <div className="p-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiUsers className="text-blue-600" />
          <h2 className="text-sm font-semibold text-gray-800">
            Suggested
          </h2>
        </div>

        <span className="bg-gray-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
          {friends.length}
        </span>
      </div>

      {friends.length === 0 ? (
        <p className="text-center text-gray-400 py-5 text-sm">
          Loading...
        </p>
      ) : (
        <>
          <ul className="max-h-[350px] overflow-y-auto px-2 py-2 space-y-2">
            {friends.map((friend) => (
              <li
                key={friend._id}
                className="flex items-center justify-between bg-gray-50 border rounded-lg p-2 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={friend.photo}
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold truncate">
                      {friend.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 truncate">
                      @{friend.username}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(friend._id)}
                  disabled={loadingUser === friend._id}
                  className={`text-[10px] px-2 py-1 rounded-full transition shrink-0
                    ${
                      following.includes(friend._id)
                        ? "bg-gray-200 text-gray-700"
                        : "bg-blue-100 text-blue-600"
                    }
                  `}
                >
                  {loadingUser === friend._id
                    ? "..."
                    : following.includes(friend._id)
                    ? "✓"
                    : "+Follow"}
                </button>
              </li>
            ))}
          </ul>

   <Link
  to="/suggestions"
  className="block w-full text-center text-xs py-2 mb-2 font-semibold bg-gray-100 hover:bg-gray-200 transition rounded-b-2xl"
>
  View All
</Link>
        </>
      )}
    </aside>
  );
};

export default FrindsReq;