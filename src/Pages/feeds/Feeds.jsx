import { useContext, useEffect, useState } from "react";
import PostBody from "../../components/postCard/PostBody";
import PostFooter from "../../components/postCard/PostFooter";
import PostHeader from "../../components/postCard/PostHeader";
import { feedApi } from "../../Services/feedServices";
import { getAllComments } from "../../Services/commentsServices";
import { likePost } from "../../Services/postServices";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";
import { AuthContext } from "../../context/AuthContext";

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(true);

  const { userData } = useContext(AuthContext);

  async function fetchFeeds() {
    try {
      setLoading(true);

      const res = await feedApi();
      const fetchedPosts = res.data.data.posts;

      setPosts(fetchedPosts);

      const likesState = {};
      fetchedPosts.forEach((post) => {
        likesState[post._id] = {
          liked: post.likes?.includes(userData._id) || false,
          count: post.likesCount || 0,
        };
      });

      setLikes(likesState);
    } catch (error) {
      console.error("Error fetching feeds:", error);
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
      console.error("Error liking post:", error);
    }
  }

  useEffect(() => {
    if (userData?._id) {
      fetchFeeds();
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
          <p>No posts available.</p>
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
                postlikscount={likes[post._id]?.count || 0}
                liked={likes[post._id]?.liked || false}
                handleLike={() => handleLike(post._id)}
                postShareCount={post.sharesCount}
                postcommentscount={post.commentsCount}
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

export default Feeds;