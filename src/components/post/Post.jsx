
import PostHeader from "../postCard/PostHeader"
import PostBody from "../postCard/PostBody"
import PostFooter from "../postCard/PostFooter"
import { useState } from "react"
import { getAllComments } from "../../Services/commentsServices"
import { likePost } from "../../Services/postServices";



const Post = ({ post }) => {
    const [likesCount, setLikesCount] = useState(post.likesCount);
    const [liked, setLiked] = useState(post.likes?.includes(post.user?._id));
    const [comments, setComments] = useState([])
    const [showinput, setShowInput] = useState(true)
    const handleToggleInput = () => {
        setShowInput(prev => !prev);
    };
    async function handleLike(postId) {
        try {
            await likePost(postId);

            setLiked((prev) => !prev);
            setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

        } catch (error) {
            console.log(error);
        }
    }
    const [commentsLoading, setCommentsLoading] = useState(false)
    async function fetchComments() {
        try {
            setCommentsLoading(true);
            const data = await getAllComments(post._id);
            // console.log(data.data.data.comments);
            setComments(data.data.data.comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setCommentsLoading(false);
        }
    }

    function handelPostWithoutImg(img, post) {

        if (!img) {
            return <>
                <div >
                    <p className=" capitalize">{post}</p>
                </div>

            </>
        }
    }

    return (
        <>
            <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 overflow-hidden w-full">
                <PostHeader photo={post.user?.photo}
                    privacy={post.privacy} username={post.user?.username} body={post.user?.body} name={post.user?.name} createdAt={post.createdAt} />
                <PostBody liked={liked} postlikscount={likesCount} handleLike={() => handleLike(post._id)} handleToggleInput={handleToggleInput} setComments={setComments} topComment={post.topComment} image={post.image} body={post.body} id={post._id} handelPostWithoutImg={handelPostWithoutImg} fetchComments={fetchComments} commentsLoading={commentsLoading} postShareCount={post.sharesCount} postcommentscount={post.commentsCount} />
                <PostFooter showinput={showinput} comments={comments} topComment={post.topComment} id={post._id} avatar={post.topComment?.commentCreator?.photo} name={post.topComment?.commentCreator?.name} content={post.topComment?.content} createdAt={post.topComment?.createdAt} fetchComments={fetchComments} />

            </article>
        </>
    )
}

export default Post