import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z][A-Za-z -]{1,28}[A-Za-z]$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetFormErrors = () => {
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedPhotoUrl = photoUrl.trim();

    if (!trimmedEmail) {
      return "Email is required.";
    }

    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    if (!trimmedPassword) {
      return "Password is required.";
    }

    if (!passwordRegex.test(trimmedPassword)) {
      return "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
    }

    if (!isLoginForm) {
      if (!trimmedFirstName || !trimmedLastName) {
        return "First name and last name are required.";
      }

      if (!nameRegex.test(trimmedFirstName) || !nameRegex.test(trimmedLastName)) {
        return "Names should be 3 to 30 letters long and can include spaces or hyphens.";
      }

      if (trimmedPhotoUrl) {
        try {
          new URL(trimmedPhotoUrl);
        } catch {
          return "Please enter a valid photo URL.";
        }
      }
    }

    return "";
  };

  const buildPayload = () => {
    const payload = {
      emailId: email.trim(),
      password: password.trim(),
    };

    if (!isLoginForm) {
      payload.firstName = firstName.trim();
      payload.lastName = lastName.trim();
      payload.gender = gender;

      if (photoUrl.trim()) {
        payload.photoUrl = photoUrl.trim();
      }
    }

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetFormErrors();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = isLoginForm ? "/login" : "/signup";
      const res = await axios.post(`${BASE_URL}${endpoint}`, buildPayload(), {
        withCredentials: true,
      });

      dispatch(addUser(isLoginForm ? res.data : res.data.data));
      navigate(isLoginForm ? "/" : "/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFormMode = () => {
    setIsLoginForm((prev) => !prev);
    setError("");
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="card w-96 bg-base-300 shadow-sm">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="mt-5 flex justify-center text-xl font-bold">
            Welcome to devTinder
          </h2>
          <p className="text-center text-sm text-gray-400">
            Swipe. Connect. Code together.
          </p>

          <label className="input validator w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              >
                <path d="M4 5h16v14H4z"></path>
                <path d="m4 7 8 6 8-6"></path>
              </g>
            </svg>

            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                resetFormErrors();
              }}
              value={email}
            />
          </label>

          <label className="input validator w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                resetFormErrors();
              }}
              value={password}
            />
          </label>

          {!isLoginForm && (
            <>
              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>

                <input
                  type="text"
                  required
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    resetFormErrors();
                  }}
                  value={firstName}
                />
              </label>

              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>

                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    resetFormErrors();
                  }}
                  value={lastName}
                />
              </label>

              <label className="w-full">
                <select
                  className="select w-full pl-3"
                  onChange={(e) => {
                    setGender(e.target.value);
                    resetFormErrors();
                  }}
                  value={gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </label>

              <label className="input validator w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  >
                    <path d="M13 6H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"></path>
                    <path d="m15 3 6 6"></path>
                    <path d="M21 3h-6v6"></path>
                  </g>
                </svg>

                <input
                  type="url"
                  placeholder="Photo URL (optional)"
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    resetFormErrors();
                  }}
                  value={photoUrl}
                />
              </label>
            </>
          )}

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            className="btn my-5 w-full border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? "Please wait..."
              : isLoginForm
                ? "</> Login"
                : "Sign Up"}
          </button>

          {isLoginForm && (
            <div
              className="mb-2 cursor-pointer text-center text-md text-gray-800"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </div>
          )}

          <div
            onClick={toggleFormMode}
            className="cursor-pointer text-center text-sm text-gray-500"
          >
            {isLoginForm ? "New user? Sign up here!" : "Existing user? Login here!"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
