import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { userData } = useContext(AuthContext);
console.log(userData)
  const avatarRef = useRef(null);
  const coverRef = useRef(null);

  const [showImage, setShowImage] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  if (!userData) return <p>Loading...</p>;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewCover(URL.createObjectURL(file));
    }
  };

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
          className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-lg text-sm shadow hover:bg-gray-100"
        >
          Change Cover
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
            className="w-32 h-32 rounded-full border-4 border-white object-cover cursor-pointer hover:scale-105 transition"
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
            className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-700"
          >
            Edit
          </button>
        </div>

    
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-gray-500">@{userData.username}</p>

          <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
            Route Posts member
          </span>
        </div>

      
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Followers</p>
            <p className="font-bold text-lg">
              {userData.followersCount || 0}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Following</p>
            <p className="font-bold text-lg">
              {userData.followingCount || 0}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-400 text-sm">Bookmarks</p>
            <p className="font-bold text-lg">
              {userData.bookmarksCount || 0}
            </p>
          </div>
        </div>

  
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">About</h3>
          <p className="text-gray-500">📧 {userData.email}</p>
          <p className="text-gray-500 mt-1">🟢 Active on Route Posts</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-gray-400 text-sm">My Posts</p>
            <p className="font-bold text-lg">0</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-gray-400 text-sm">Saved Posts</p>
            <p className="font-bold text-lg">
              {userData.bookmarksCount || 0}
            </p>
          </div>
        </div>
      </div>

  
      <div className="mt-6 flex bg-white rounded-xl shadow overflow-hidden">
        <button className="flex-1 p-4 text-blue-600 font-semibold border-b-2 border-blue-600">
          My Posts
        </button>
        <button className="flex-1 p-4 text-gray-500 hover:text-blue-600">
          Saved
        </button>
      </div>

  
      <div className="mt-6 text-center text-gray-400">
        You have not posted yet.
      </div>


      {showImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowImage(false)}
        >
        
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowImage(false);
            }}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ×
          </button>

       
          <img
            src={
              previewAvatar ||
              userData.photo ||
              "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            }
            alt="zoomed"
            className="max-w-[90%] max-h-[80%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;