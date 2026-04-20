import { useOutletContext } from "react-router";
import Post from "../../components/post/Post"
import PostSkeleton from "../../components/skeletons/PostSkeleton";

const NewsFeed = () => {

  const { posts } = useOutletContext();

  return (
    <>
      <div className="space-y-6">
        {posts.length === 0 ? (
          <>
            {[...Array(2)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </>
        ) : (
          posts.map(post => (
            <Post key={post._id} post={post} />
          ))
        )}
      </div>
    </>
  )
}

export default NewsFeed