import { useContext, useState } from "react";
import { getAvatar, getCurrentTime } from "../../Lib/helperFunctions/helperFunc";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { FiImage, FiSend } from "react-icons/fi";
import { Avatar } from "@heroui/react";
import { LuMessageCircle, LuSmile } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";
import { createComment } from "../../Services/commentsServices";
import { toast } from "react-toastify";
import { MdOutlineScheduleSend } from "react-icons/md";
const PostFooter = ({
  topComment,
  id,
  name,
  avatar,
  content,
  createdAt,
  comments,
  fetchComments,
  showinput,
}) => {


  const { userData } = useContext(AuthContext);


  const [showEmoji, setShowEmoji] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const[commentLoading,setCommentLoading]=useState(false)
  const [commentBody, setCommentBody] = useState("")
  const otherComments = comments?.filter(
    (comment) => comment._id !== topComment?._id
  );

  const onEmojiClick = (emojiData) => {
    setCommentBody((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };
  async function handleSubmit(postID) {
    if (!commentBody.trim()) return;

    try {
      setCommentLoading(true)
      const formData = new FormData();
      formData.append("content", commentBody);

      const res = await createComment(postID, formData);

      toast.success(res.data.message);
      setCommentBody("");
      setShowAll(true)
      fetchComments(id)
    } catch (error) {
      console.log(error.response?.data);
      toast.error("failed to send message");
    }finally{
      setCommentLoading(false)
      
    }
  }


  return (
    <div className="border-t border-gray-200 pt-4">


      {topComment ? (
        <>
          <h1> top comment</h1>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              {getAvatar(avatar) ? (
                <img
                  src={getAvatar(avatar)}
                  alt={name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}

              <div>
                <h5 className="font-medium text-gray-800">
                  {name || "Anonymous"}
                </h5>

                <p className="text-sm text-gray-600">{content}</p>

                <p className="text-xs text-gray-500">
                  {getCurrentTime(createdAt)}
                </p>
              </div>
            </li>
          </ul>

        </>
      ) : (
        null
      )}
    

      {/* Other comments */}
      {otherComments?.length > 0 && (
        <ul className="space-y-4 mt-3">
          {otherComments.map((comment) => (
            <li key={comment._id} className="flex items-start gap-3">
              {getAvatar(comment.commentCreator?.photo) ? (
                <img
                  src={getAvatar(comment.commentCreator?.photo)}
                  alt={comment.commentCreator?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}

              <div>
                <h5 className="font-medium text-gray-800">
                  {comment.commentCreator?.name || "Anonymous"}
                </h5>

                <p className="text-sm text-gray-600">
                  {comment?.content}
                </p>

                <p className="text-xs text-gray-500">
                  {getCurrentTime(comment.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
        {topComment && (
        <h1
          className={`font-bold text-blue-500 hover:underline cursor-pointer mt-3 ${showAll ? "hidden" : ""
            }`}
          onClick={() => {
            fetchComments(id);
            setShowAll(true);
          }}
        >
          View All Comments
        </h1>

      )}
      {showinput == false && !topComment && (
        <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 space-y-2">
          <LuMessageCircle size={40} className="text-blue-100" />
          <p className="font-semibold text-gray-800">No comments yet</p>
          <p className="text-sm text-gray-400">Be the first to comment.</p>
        </div>
      )}

      {!showinput && (
        <div className="flex items-start gap-4 mt-4">
          <Avatar
            size="md"
            src={
              userData?.photo ||
              "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
            }
          />

          <div className="w-full bg-gray-100 rounded-2xl px-4 py-3 flex items-center justify-between">
            <input
              type="text"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}

              placeholder={`Comment as ${userData?.username || "Guest"}...`}
              className="bg-transparent outline-none w-full text-sm"
            />

            <div className="relative flex items-center gap-3 ml-3">
              <button className="text-gray-500 hover:text-blue-500">
                <FiImage />
              </button>

              <button
                onClick={() => setShowEmoji(!showEmoji)}
                className="flex items-center gap-2"
              >
                <LuSmile size={20} className="text-yellow-500" />
              </button>

              <button

                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(id);
                }}

                disabled={!commentBody.trim() && commentLoading}
                className={`p-2 rounded-full text-white ${commentBody.trim()
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {commentLoading?<MdOutlineScheduleSend/>: <FiSend />}
              </button>

              {showEmoji && (
                <div className="absolute buttom-0 right-0 z-50">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PostFooter;