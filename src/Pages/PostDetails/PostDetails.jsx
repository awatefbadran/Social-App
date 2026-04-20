import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import { singlePostsApi, likePost } from "../../Services/postServices";
import PostHeader from "../../components/postCard/PostHeader";
import PostBody from "../../components/postCard/PostBody";
import PostFooter from "../../components/postCard/PostFooter";
import PostSkeleton from "../../components/Skeletons/PostSkeleton";
import { FiArrowLeft } from "react-icons/fi";
import { getAllComments } from "../../Services/commentsServices";
import { AuthContext } from "../../context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const { userData } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  async function fetchComments() {
    try {
      setCommentsLoading(true);
      const data = await getAllComments(post._id);
      setComments(data.data.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  }

  

  async function handleLike(postId) {
    try {
      await likePost(postId);

      setLiked((prev) => {
        setLikesCount((count) => (prev ? count - 1 : count + 1));
        return !prev;
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchPostDetails(postId) {
      const response = await singlePostsApi(postId);
      const fetchedPost = response.data.data.post;

      setPost(fetchedPost);
      setLikesCount(fetchedPost.likesCount);

      setLiked(
        fetchedPost.likes?.includes(userData?._id) || false
      );
    }

    if (userData?._id) {
      fetchPostDetails(id);
    }
  }, [id, userData]);

  function handelPostWithoutImg(img, post) {
    if (!img) {
      return (
        <div className="w-full h-[200px] bg-blue-300 text-white flex items-center justify-center">
          <p className="text-center capitalize">{post}</p>
        </div>
      );
    }
  }

  return (
    <>
      {post ? (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-6 py-6">

          {/* Back Button */}
          <div className="self-start ml-[15%]">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 shadow-sm"
            >
              <FiArrowLeft />
              <span>Back</span>
            </Link>
          </div>

          {/* Post */}
          <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 overflow-hidden w-[80%]">

            <PostHeader
              photo={post.user?.photo}
              privacy={post.privacy}
              username={post.user?.username}
              body={post.user?.body}
              name={post.user?.name}
              createdAt={post.createdAt}
            />

            <PostBody
              liked={liked}
              postlikscount={likesCount}
              handleLike={() => handleLike(post._id)}
              setComments={setComments}
              topComment={post.topComment}
              image={post.image}
              body={post.body}
              id={post._id}
              handelPostWithoutImg={handelPostWithoutImg}
              fetchComments={fetchComments}
              commentsLoading={commentsLoading}
              postShareCount={post.sharesCount}
              postcommentscount={post.commentsCount}
            />

            <PostFooter
              comments={comments}
              topComment={post.topComment}
              id={post._id}
              avatar={post.topComment?.commentCreator?.photo}
              name={post.topComment?.commentCreator?.name}
              content={post.topComment?.content}
              createdAt={post.topComment?.createdAt}
              fetchComments={fetchComments}
            />

          </article>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-[80%] h-[90%]">
            <PostSkeleton className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;