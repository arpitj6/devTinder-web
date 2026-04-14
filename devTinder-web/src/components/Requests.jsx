import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-gray-500">
        No connection requests yet 🤝
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Connection Requests 📩
      </h1>

      {/* Requests List */}
      <div className="flex flex-col gap-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, gender, age, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="flex items-center justify-between gap-4 p-4 rounded-xl shadow-md bg-base-200 hover:shadow-xl transition"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={photoUrl}
                  alt="profile"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {firstName} {lastName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {gender === "male" ? "♂️ Male" : "♀️ Female"} • {age} years
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {about || "No bio available"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  className="btn btn-circle btn-error"
                  onClick={() => reviewRequests("rejected", request._id)}
                >
                  ❌
                </button>

                <button
                  className="btn btn-circle btn-success"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  ✅
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
