import React, { useContext, useEffect, useState } from "react";
import { savedpostes, likePost } from "../../Services/postServices";
import { getAllComments } from "../../Services/commentsServices";
import { AuthContext } from "../../context/AuthContext";

import PostHeader from "../../components/postCard/PostHeader";
import PostBody from "../../components/postCard/PostBody";
import PostFooter from "../../components/postCard/PostFooter";
import PostSkeleton from "../../components/Skeletons/postSkeleton";

const Saved = () => {
  const { userData } = useContext(AuthContext);

  const [saved, setSaved] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch saved posts
  async function fetchSavedPosts() {
    try {
      setLoading(true);

      const res = await savedpostes();

      const fetchedPosts = res.data.data.bookmarks.map((post) => ({
        ...post,
        _id: post._id || post.id,
      }));

      setSaved(fetchedPosts);

      // init likes
      const likesState = {};
      fetchedPosts.forEach((post) => {
        likesState[post._id] = {
          liked: post.likes?.includes(userData?._id) || false,
          count: post.likesCount || 0,
        };
      });

      setLikes(likesState);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    } finally {
      setLoading(false);
    }
  }

  // Like
  async function handleLike(postId) {
    try {
      await likePost(postId);

      setLikes((prev) => ({
        ...prev,
        [postId]: {
          liked: !prev[postId].liked,
          count: prev[postId].liked
            ? prev[postId].count - 1
            : prev[postId].count + 1,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  }

  // Comments
  async function fetchComments(postId) {
    try {
      setCommentsLoading(true);
      const data = await getAllComments(postId);

      setComments((prev) => ({
        ...prev,
        [postId]: data.data.data.comments,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  }

  useEffect(() => {
    if (userData?._id) {
      fetchSavedPosts();
    }
  }, [userData]);

  function handelPostWithoutImg(img, post) {
    if (!img) {
      return (
        <div>
          <p className="capitalize">{post}</p>
        </div>
      );
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {loading ? (
        // Loading
        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : saved.length === 0 ? (
        // No Saved
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
          <p>No saved posts yet.</p>
        </div>
      ) : (
        // Data
        <div className="flex flex-col items-center space-y-6">
          {saved.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 overflow-hidden w-full space-y-5"
            >
              {/* Header */}
              <PostHeader
                photo={post.user?.photo}
                privacy={post.privacy}
                username={post.user?.username}
                body={post.user?.body}
                name={post.user?.name}
                createdAt={post.createdAt}
              />

              {/* Body */}
              <PostBody
                setComments={setComments}
                topComment={post.topComment}
                image={post.image}
                body={post.body}
                id={post._id}
                handelPostWithoutImg={handelPostWithoutImg}
                fetchComments={() => fetchComments(post._id)}
                commentsLoading={commentsLoading}
                postShareCount={post.sharesCount}
                postcommentscount={post.commentsCount}
                liked={likes[post._id]?.liked || false}
                postlikscount={likes[post._id]?.count || 0}
                handleLike={() => handleLike(post._id)}
              />

              {/* Footer */}
              <PostFooter
                comments={comments[post._id] || []}
                topComment={post.topComment}
                id={post._id}
                avatar={post.topComment?.commentCreator?.photo}
                name={post.topComment?.commentCreator?.name}
                content={post.topComment?.content}
                createdAt={post.topComment?.createdAt}
                fetchComments={() => fetchComments(post._id)}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;