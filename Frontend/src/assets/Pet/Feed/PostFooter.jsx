import { useState } from 'react';
import { FaBell, FaHeart, FaComment } from 'react-icons/fa'; // FaBell, FaHeart, and FaComment are examples

export default function PostFooter() {
  const [liked, setLike] = useState(false);
  const [likes, setLikes] = useState(1000);

  const handleLike = () => {
    setLike(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <>
      <div className="flex items-center gap-4 w-full pt-0 mb-2 my-4">
        <div onClick={handleLike} className="cursor-pointer text-lg">
          {liked ? <FaHeart className="text-red-500" /> : <FaHeart />}
        </div>
        <div className="cursor-pointer text-lg">
          <FaComment />
        </div>
      </div>
      <p className='text-sm font-bold text-black '>
        1000 likes

      </p>
      
      <p className="text-sm font-normal">
        _Nice
      </p>
      <p className="text-sm text-gray-500 py-2">
        View all 1000 comments
      </p>

      <div className="flex items-center gap-2 w-full py-2">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Add comment ..."
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm py-1"
          />
        </div>
        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
          Post
        </button>
      </div>
    </>
  );
}