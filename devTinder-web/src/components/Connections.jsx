import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConections } from "../../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConections(res?.data?.data || []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-gray-500">
        No connections yet 🤝
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Connections 🤝
      </h1>

      {/* Connections List */}
      <div className="flex flex-col gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, gender, age, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex items-center gap-5 p-4 rounded-xl shadow-md bg-base-200 hover:shadow-xl transition"
            >

              {/* Profile Image */}
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={photoUrl}
                alt="profile"
              />

              {/* User Info */}
              <div className="flex-1">

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

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="btn btn-sm btn-outline">
                  View Profile
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;