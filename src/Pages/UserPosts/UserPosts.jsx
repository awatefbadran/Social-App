import { useContext, useEffect, useState } from "react";
import PostBody from "../../components/postCard/PostBody";
import PostFooter from "../../components/postCard/PostFooter";
import PostHeader from "../../components/postCard/PostHeader";
import { feedApi } from "../../Services/feedServices";
import { getAllComments } from "../../Services/commentsServices";
import PostSkeleton from "../../components/Skeletons/PostSkeleton.jsx";
import { AuthContext } from "../../context/AuthContext";
import { likePost } from "../../Services/postServices";

const UserPosts = () => {
  const { userData } = useContext(AuthContext);

  const [likes, setLikes] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function handleLike(postId) {
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
  }

  async function fetchMyPosts() {
    try {
      setLoading(true);

      const res = await feedApi();

      const myPosts = res.data.data.posts.filter(
        (post) => post.user?._id === userData?._id
      );

      setPosts(myPosts);

      const likesState = {};
      myPosts.forEach((post) => {
        likesState[post._id] = {
          liked: post.likes?.includes(userData._id) || false,
          count: post.likesCount || 0,
        };
      });

      setLikes(likesState);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
      fetchMyPosts();
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
      
        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
      
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
          <p>You haven’t posted anything yet.</p>
        </div>
      ) : (
    
        <div className="flex flex-col items-center space-y-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 overflow-hidden w-full space-y-5"
            >
              <PostHeader
                photo={post.user?.photo}
                privacy={post.privacy}
                username={post.user?.username}
                body={post.user?.body}
                name={post.user?.name}
                createdAt={post.createdAt}
              />

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

export default UserPosts;