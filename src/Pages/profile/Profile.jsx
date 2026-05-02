import React, { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  uploadPhotoApi,
  postsApi,
  savedpostes,
} from "../../Services/postServices";

const Profile = () => {
  const { userData } = useContext(AuthContext);

  const avatarRef = useRef(null);
  const coverRef = useRef(null);

  const [showImage, setShowImage] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);

  if (!userData) return <p>Loading...</p>;

  useEffect(() => {
    getPosts();
    getSaved();
  }, []);

  const getPosts = async () => {
    try {
      const res = await postsApi();
      console.log("POSTS:", res.data);

      setPosts(res.data.posts || res.data.data?.posts || []);
    } catch (err) {
      console.log(err);
      setPosts([]);
    }
  };

  const getSaved = async () => {
    try {
      const res = await savedpostes();
      console.log("SAVED:", res.data);

      setSavedPosts(res.data.posts || res.data.data?.posts || []);
    } catch (err) {
      console.log(err);
      setSavedPosts([]);
    }
  };


  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewAvatar(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await uploadPhotoApi(formData);
      window.location.reload(); 
    } catch (err) {
      console.log(err);
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewCover(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("cover", file);

    try {
      await uploadPhotoApi(formData);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  const myPosts = (posts || []).filter(
    (post) => post.user?._id === userData._id
  );


  return (
    <div className="max-w-5xl mx-auto p-4">
   
      <div className="relative">
        <img
          src={
            previewCover ||
            (userData.cover?.trim()
              ? userData.cover
              : "https://images.unsplash.com/photo-1503264116251-35a269479413")
          }
          alt="cover"
          className="w-full h-52 object-cover rounded-2xl"
        />

        <input
          type="file"
          ref={coverRef}
          className="hidden"
          onChange={handleCoverChange}
        />

        <button
          onClick={() => coverRef.current.click()}
          className="absolute bottom-3 right-3 bg-black/60 text-white px-4 py-2 rounded-lg"
        >
          Change Cover 📷
        </button>
      </div>

   
      <div className="bg-white rounded-2xl shadow-md p-6 -mt-20 relative z-10">
      
        <div className="relative w-fit">
          <img
            src={
              previewAvatar ||
              userData.photo ||
              "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            }
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-white object-cover cursor-pointer"
            onClick={() => setShowImage(true)}
          />

          <input
            type="file"
            ref={avatarRef}
            className="hidden"
            onChange={handleAvatarChange}
          />

          <button
            onClick={() => avatarRef.current.click()}
            className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
          >
            Edit
          </button>
        </div>

    
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-gray-500">@{userData.username}</p>
        </div>

     
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-gray-100 p-4 rounded-xl">
            <p>Followers</p>
            <p className="font-bold">{userData.followersCount || 0}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p>Following</p>
            <p className="font-bold">{userData.followingCount || 0}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p>Bookmarks</p>
            <p className="font-bold">{userData.bookmarksCount || 0}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex bg-white rounded-xl shadow">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 p-4 ${
            activeTab === "posts"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          My Posts
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 p-4 ${
            activeTab === "saved"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Saved
        </button>
      </div>

   
      <div className="mt-6">
        {activeTab === "posts" ? (
          !myPosts.length ? (
            <p className="text-center text-gray-400">No posts yet</p>
          ) : (
            myPosts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded-xl shadow mb-3">
                <p>{post.body}</p>
              </div>
            ))
          )
        ) : !savedPosts?.length ? (
          <p className="text-center text-gray-400">No saved posts</p>
        ) : (
          savedPosts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-xl shadow mb-3">
              <p>{post.body}</p>
            </div>
          ))
        )}
      </div>

  
      {showImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center"
          onClick={() => setShowImage(false)}
        >
          <img
            src={previewAvatar || userData.photo}
            className="max-w-[90%] max-h-[80%] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;