import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { addConections } from "../../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConections(res?.data?.data || []));
    } catch (err) {
      console.log(err);
      dispatch(addConections([]));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Your Connections
        </h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-5 rounded-xl bg-base-200 p-4 shadow-md"
            >
              <div className="skeleton h-16 w-16 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-52"></div>
              </div>
              <div className="skeleton h-8 w-28"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="mt-10 text-center text-xl font-semibold text-gray-500">
        No connections yet.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <h1 className="mb-8 text-center text-3xl font-bold">Your Connections</h1>

      <div className="flex flex-col gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, gender, age, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex items-center gap-5 rounded-xl bg-base-200 p-4 shadow-md transition hover:shadow-xl"
            >
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={photoUrl}
                alt="profile"
              />

              <div className="flex-1">
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

              <div className="flex gap-2">
                <button className="btn btn-sm btn-outline" type="button">
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
