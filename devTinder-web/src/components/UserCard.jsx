import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeedFeed } from "../../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const handleRequest = async (status, userId) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      if (res) {
        // dispatch
        dispatch(removeUserFromFeedFeed(userId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="card bg-base-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 w-80">
        {/* Profile Image */}
        <figure>
          <img
            src={
              user.photoUrl?.startsWith("http")
                ? user.photoUrl
                : `data:image/jpeg;base64,${user.photoUrl}`
            }
            alt={user.firstName}
            className="w-32 h-32 object-cover rounded-full mx-auto mt-6 shadow-md"
          />
        </figure>

        <div className="card-body text-center">
          {/* Name */}
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          {/* Age + Gender */}
          <p className="text-gray-500 text-sm">
            {user.gender === "male"
              ? "♂️"
              : user.gender === "female"
                ? "♀️"
                : "⚧️"}{" "}
            • {user?.age || "N/A"} years
          </p>

          {/* About */}
          <p className="text-gray-400 text-sm mt-1">
            {user.about || "Passionate developer looking for collaborators 🚀"}
          </p>

          {/* Skills (optional if backend provides) */}
          {user.skills && (
            <div className="flex justify-center gap-2 flex-wrap mt-3">
              {user.skills.map((skill, index) => (
                <span key={index} className="badge badge-outline">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <hr className="mt-3" />

          {/* Action Buttons */}
          <div className="flex justify-center gap-8">
            <button
              className="btn btn-circle btn-error text-white text-xl"
              onClick={() => handleRequest("ignored", user._id)}
            >
              ❌
            </button>
            <button
              className="btn btn-circle btn-success text-white text-xl"
              onClick={() => handleRequest("interested", user._id)}
            >
              ❤️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
