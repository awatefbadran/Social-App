import { AiOutlineLike } from "react-icons/ai";
import { LuMessageCircle } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { Link } from "react-router";

const PostBody = ({
  image,
  body,
  id,
  handelPostWithoutImg,
  commentsLoading,
  postcommentscount,
 postShareCount,
 handleToggleInput,
 handleLike,
 postlikscount,
 liked
}) => {
  
  return (
    <>
   
      {image && (
        <div className="px-4 pb-3">
          <p className="text-gray-700 text-[15px] whitespace-pre-line">
            {body}
          </p>
        </div>
      )}

    
      {image ? (
        <img
          src={image}
          alt="Post Image"
          className="w-full h-auto rounded-lg mb-4"
        />
      ) : (
        handelPostWithoutImg(image, body)
      )}

   
      <div className="flex items-center justify-between px-4 text-sm text-gray-500 mb-2 mt-4">
        <div className="flex gap-2 items-center">
          <span className="bg-blue-700 rounded-full text-white w-5 h-5 flex items-center justify-center">
  <AiOutlineLike className="text-md" />
</span>
          <span>{postlikscount} likes</span>
        </div>
<div className="flex items-center gap-4">
  <span>{postShareCount} shares</span>
  <span>{postcommentscount} comments</span>

  <Link
    to={`/post/${id}`}
    className="text-blue-600 font-bold text-[10px] cursor-pointer"
  >
    View details
  </Link>
</div>
      </div>


      <div className="flex items-center gap-4 mb-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 border-gray-100 justify-between">
      <button
  className={`inline-flex items-center gap-1.5 cursor-pointer ${liked ? "text-blue-600" : "text-gray-500"
  }`}
  onClick={handleLike}
>
  <AiOutlineLike className="h-6 w-6" />
  <span className="ml-1 text-lg">{liked ? "Liked" : "Like"}</span>
</button>

        <button className="inline-flex items-center gap-1.5 cursor-pointer" onClick={()=>handleToggleInput()}>
          <LuMessageCircle className="text-gray-500 h-6 w-6" />
          {commentsLoading ? (
            <span className="ml-1 text-lg">Loading comments...</span>
          ) : (
            <span className="ml-1 text-lg">Comment</span>
          )}
        </button>

        <button className="inline-flex items-center gap-1.5 cursor-pointer">
          <IoShareSocialOutline className="text-gray-500 h-6 w-6" />
          <span className="ml-1 text-lg">Share</span>
        </button>
      </div>
    </>
  );
};

export default PostBody;