import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setErrorMsg("");
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);

      navigate("/login");
     
    } catch (err) {
      setErrorMsg(err?.response?.data || "Sign up failed");
    }
  };

  return (
    <div className="flex justify-center items-center my-25">
      <div className="card card-dash bg-base-300 w-full max-w-md shadow-lg">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl mb-4">Create Account</h2>

          {/* First Name */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Last Name */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="mail@site.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            <button className="btn btn-primary w-full" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>

          {/* Redirect to Login */}
          <div className="text-sm text-center mt-3">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
