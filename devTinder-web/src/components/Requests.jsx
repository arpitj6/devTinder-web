import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addRequest, removeRequest } from "../../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.log(err);
      dispatch(addRequest([]));
    } finally {
      setIsLoading(false);
    }
  };

  const reviewRequests = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Connection Requests
        </h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 rounded-xl bg-base-200 p-4 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 rounded-full"></div>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-40"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-52"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="skeleton h-12 w-12 rounded-full"></div>
                <div className="skeleton h-12 w-12 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="mt-10 text-center text-xl font-semibold text-gray-500">
        No connection requests yet.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Connection Requests
      </h1>

      <div className="flex flex-col gap-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, gender, age, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="flex items-center justify-between gap-4 rounded-xl bg-base-200 p-4 shadow-md transition hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={photoUrl}
                  alt="profile"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {firstName} {lastName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {gender === "male" ? "Male" : "Female"} • {age} years
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {about || "No bio available"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="btn btn-circle btn-error"
                  onClick={() => reviewRequests("rejected", request._id)}
                  type="button"
                >
                  X
                </button>

                <button
                  className="btn btn-circle btn-success"
                  onClick={() => reviewRequests("accepted", request._id)}
                  type="button"
                >
                  OK
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
