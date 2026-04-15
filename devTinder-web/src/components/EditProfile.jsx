import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const nameRegex = /^[A-Za-z][A-Za-z -]{1,28}[A-Za-z]$/;

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age ? String(user.age) : "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const successTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const clearFeedback = () => {
    if (error) {
      setError("");
    }

    if (showMessage) {
      setShowMessage(false);
    }
  };

  const validateForm = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedAge = age.toString().trim();
    const trimmedAbout = about.trim();
    const trimmedPhotoUrl = photoUrl.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      return "First name and last name are required.";
    }

    if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
      return "Names should be 3 to 30 letters long and can include spaces or hyphens.";
    }

    if (!trimmedAge) {
      return "Age is required.";
    }

    const parsedAge = Number(trimmedAge);
    if (!Number.isInteger(parsedAge) || parsedAge < 18 || parsedAge > 100) {
      return "Age must be a whole number between 18 and 100.";
    }

    if (trimmedAbout.length > 300) {
      return "Bio must be 300 characters or less.";
    }

    if (!["male", "female", "others"].includes(gender)) {
      return "Please select a valid gender.";
    }

    if (!trimmedPhotoUrl) {
      return "Photo URL is required.";
    }

    try {
      new URL(trimmedPhotoUrl);
    } catch {
      return "Please enter a valid photo URL.";
    }

    return "";
  };

  const handleSaveProfile = async () => {
    clearFeedback();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/profile/edit`,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          age: Number(age),
          about: about.trim(),
          gender,
          photoUrl: photoUrl.trim(),
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setShowMessage(true);
      successTimeoutRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to save profile. Please try again.",
      );
    } finally {
      setLoading(false);
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
          <span>Your profile has been updated successfully.</span>
        </div>
      )}

      <div className="my-10 flex justify-center gap-20">
        <div className="flex justify-center">
          <div className="card w-96 bg-base-300 shadow-sm">
            <div className="card-body">
              <h2 className="card-title flex justify-center text-xl font-bold">
                Edit Profile
              </h2>

              <label className="input validator w-full">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearFeedback();
                  }}
                  value={firstName}
                />
              </label>

              <label className="input validator w-full">
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    clearFeedback();
                  }}
                  value={lastName}
                />
              </label>

              <label className="input validator w-full">
                <input
                  type="number"
                  required
                  min="18"
                  max="100"
                  placeholder="Age"
                  onChange={(e) => {
                    setAge(e.target.value);
                    clearFeedback();
                  }}
                  value={age}
                />
              </label>

              <fieldset className="fieldset">
                <textarea
                  className="textarea h-24 w-full pl-3 pt-3"
                  placeholder="Your bio"
                  maxLength="300"
                  onChange={(e) => {
                    setAbout(e.target.value);
                    clearFeedback();
                  }}
                  value={about}
                ></textarea>
              </fieldset>

              <label className="w-full">
                <select
                  className="select w-full pl-3"
                  onChange={(e) => {
                    setGender(e.target.value);
                    clearFeedback();
                  }}
                  value={gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </label>

              <label className="input validator w-full">
                <input
                  type="url"
                  required
                  placeholder="Photo URL"
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    clearFeedback();
                  }}
                  value={photoUrl}
                />
              </label>

              {error && <div className="text-red-500">{error}</div>}

              <button
                className="btn mt-4 w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600"
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <UserCard
            showActions={false}
            user={{
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              age,
              about: about.trim(),
              gender,
              photoUrl: photoUrl.trim(),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
