import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          photoUrl,
        },
        { withCredentials: true },
      );
      if (res) {
        dispatch(addUser(res?.data?.data));
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.message || "Failed to save profile. Please try again.",
      );
    }
  };

  return (
    <>
      {showMessage && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your profile has been updated successfully!</span>
        </div>
      )}

      <div className="flex justify-center my-20 gap-20">
        <div className="flex justify-center ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body ">
              <h2 className="card-title flex justify-center text-xl  font-bold">
                Edit Profile ✏️
              </h2>

              <label className="input validator w-full">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </label>

              <label className="input validator w-full">
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </label>

              <label className="input validator w-full">
                <input
                  type="text"
                  required
                  placeholder="age"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </label>

                <fieldset className="fieldset">
                  <textarea
                    className="textarea h-24 w-full pl-3 pt-3"
                    placeholder="your Bio"
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                  ></textarea>
                </fieldset>

              <label className="w-full">
                <select
                  className="select w-full pl-3"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>
              </label>
              <label className="input validator w-full">
                <input
                  type="text"
                  required
                  placeholder="photoUrl"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="3000"
                  title="Only letters, numbers or dash"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  value={photoUrl}
                />
              </label>

              {error && <div className="text-red-500">{error}</div>}

              <button
                className="btn w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white border-gray-700 hover:from-gray-700 hover:to-gray-600 my-10"
                onClick={handleSaveProfile}
              >
                save profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <UserCard
            user={{ firstName, lastName, age, about, gender, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
