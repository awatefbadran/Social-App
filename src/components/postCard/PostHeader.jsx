
import { getAvatar, getCurrentTime } from '../../Lib/helperFunctions/helperFunc'
import { FaUserCircle } from 'react-icons/fa'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'


const PostHeader = ({ photo, name, createdAt, username,
    privacy }) => {

    return (
        <>
            <div className="flex justify-between ">
                <div className="flex items-center gap-3 mb-4">{getAvatar(photo) ? (
                    <img
                        src={getAvatar(photo)}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                )}
                    <div>
                         <h3 className="font-semibold text-gray-800">{name || "Anonymous User"}</h3>
                        <div className='flex gap-2 items-center justify-center'>
                                <p className='text-gray-400 text-sm'>@{username}</p>
                        <p className="text-xs text-gray-500">{getCurrentTime(createdAt)}</p>
                            <p className="text-xs text-gray-500">{privacy}</p>
                        </div>
                   


                    </div>

                </div>
                <div>
                    <HiOutlineDotsHorizontal className="w-5 h-5 text-gray-500" />
                </div>
            </div>
        </>
    )
}

export default PostHeader