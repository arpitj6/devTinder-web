import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(!feed);

  const getFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      console.log(err);
      dispatch(addFeed([]));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="feed my-2">
        <h2 className="mb-2 text-center text-md font-bold">Discover People</h2>
        <div className="flex justify-center">
          <div className="card w-80 bg-base-200 shadow-xl">
            <div className="flex justify-center pt-6">
              <div className="skeleton h-32 w-32 rounded-full"></div>
            </div>
            <div className="card-body items-center text-center">
              <div className="skeleton h-6 w-40"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-56"></div>
              <div className="mt-3 w-full border-t border-base-300"></div>
              <div className="mt-3 flex justify-center gap-8">
                <div className="skeleton h-12 w-12 rounded-full"></div>
                <div className="skeleton h-12 w-12 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        No more developers to show.🚀
      </div>
    );
  }

  return (
    <div className="feed my-2">
      <h2 className="mb-2 text-center text-md font-bold">Discover People 🌍</h2>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
