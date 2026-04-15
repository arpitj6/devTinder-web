import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const resetMessages = () => {
    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedOldPassword = oldPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedEmail) {
      return "Email is required.";
    }

    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address.";
    }

    if (!trimmedOldPassword) {
      return "Current password is required.";
    }

    if (!trimmedNewPassword) {
      return "New password is required.";
    }

    if (!passwordRegex.test(trimmedNewPassword)) {
      return "New password must be at least 8 characters and include uppercase, lowercase, and a number.";
    }

    if (trimmedOldPassword === trimmedNewPassword) {
      return "New password must be different from your current password.";
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    resetMessages();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${BASE_URL}/profile/password`,
        {
          oldPassword: oldPassword.trim(),
          newPassword: newPassword.trim(),
          email: email.trim(),
        },
        { withCredentials: true },
      );

      setSuccess("Password changed successfully! Redirecting to login...");
      redirectTimeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="card w-96 bg-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mt-5 flex justify-center text-xl font-bold">
            Reset Your Password
          </h2>

          <form onSubmit={handleResetPassword}>
            <label className="input validator mb-4 w-full">
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
                  resetMessages();
                }}
                value={email}
              />
            </label>

            <label className="input validator mb-4 w-full">
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
                placeholder="Current Password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  resetMessages();
                }}
                value={oldPassword}
              />
            </label>

            <label className="input validator mb-4 w-full">
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
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  resetMessages();
                }}
                value={newPassword}
              />
            </label>

            <label className="input validator mb-4 w-full">
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
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  resetMessages();
                }}
                value={confirmPassword}
              />
            </label>

            {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
            {success && (
              <div className="mb-4 text-sm text-green-500">{success}</div>
            )}

            <button
              type="submit"
              className="btn my-5 w-full border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:from-gray-700 hover:to-gray-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Reset Password
                </>
              )}
            </button>
          </form>

          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
