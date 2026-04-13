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
      if (res) {
        console.log(res);
        dispatch(addConections(res?.data?.data || []));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="text-center font-2xl font-bold">No connections yet! </div>
    );
  }

  return (
    <>
      <div className="text-center font-3xl font-bold">connections </div>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, gender, age , about } = connection;
        return (
          <div className="flex m-4 p-4 rounded-lg shadow-xl  w-1/2 mx-auto bg-sky-100/50">
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="Profile"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="text-xl font-bold ">
                {firstName} {lastName} | {gender === "male" ? "♂️" : "♀️"} |{" "}
                {age} years
              </h2>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Connections;
