import { Outlet } from "react-router"
import CreatePost from "../../components/createPost/CreatePost";
import Sidebar from "../../components/sidBar/SidBar";
import FrindsReq from "../../components/frindsReq/FrindsReq";
import { useEffect, useState } from "react";
import { postsApi } from "../../Services/postServices";

export default function PostsLayout() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await postsApi();
    setPosts(response.data.data.posts);
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchPosts();
  }
}, []);

  return (
<div className="bg-gray-200 min-h-screen w-full">
  <div className="mx-auto pt-5 px-4">

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      <div className="col-span-1 lg:col-span-1 w-full order-1">
        <Sidebar />
      </div>

      <div className="lg:col-span-2 order-2">
        <CreatePost refetchPosts={fetchPosts} />
        <Outlet context={{ posts, fetchPosts }} />
      </div>

      <div className="lg:col-span-1 lg:block order-3">
        <FrindsReq />
      </div>

    </div>

  </div>
</div>
  );
}