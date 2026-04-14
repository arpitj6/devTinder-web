import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed?.length === 0 || !feed) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No more developers to show 🚀
      </div>
    );
  }

  return (
    feed && (
      <div className="feed my-2">
        <h2 className="text-md font-bold mb-2 text-center">
          Discover People 🌍
        </h2>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
