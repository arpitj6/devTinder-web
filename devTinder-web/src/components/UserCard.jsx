import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeedFeed } from "../../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();

  if (!user) return null;

  const handleRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeUserFromFeedFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const photoSource = user.photoUrl?.startsWith("http")
    ? user.photoUrl
    : `data:image/jpeg;base64,${user.photoUrl}`;

  return (
    <div className="flex justify-center">
      <div className="card w-80 bg-base-200 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <figure>
          <img
            src={photoSource}
            alt={user.firstName}
            className="mx-auto mt-6 h-32 w-32 rounded-full object-cover shadow-md"
          />
        </figure>

        <div className="card-body text-center">
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-sm text-gray-500">
            {user.gender === "male"
              ? "Male ♂️"
              : user.gender === "female"
                ? "Female ♀️"
                : "Other"}{" "}
            • {user?.age || "N/A"} years
          </p>

          <p className="mt-1 text-sm text-gray-400">
            {user.about || "Passionate developer looking for collaborators."}
          </p>

          {user.skills && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="badge badge-outline">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {showActions && (
            <>
              <hr className="mt-3" />
              <div className="flex justify-center gap-8">
                <button
                  className="btn btn-circle btn-error text-xl text-white"
                  onClick={() => handleRequest("ignored", user._id)}
                  type="button"
                >
                  ❌
                </button>
                <button
                  className="btn btn-circle btn-success text-xl"
                  onClick={() => handleRequest("interested", user._id)}
                  type="button"
                >
                  ❤️
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
