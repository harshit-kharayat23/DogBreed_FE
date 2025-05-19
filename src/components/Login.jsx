import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState("harshit224@gmail.com");
  const [password, setPassword] = useState("Harshit@2181");
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setErrorMsg('');
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        navigate("/body");
        setShowToast(false);
        
      }, 1500);
      

    } catch (err) {
      setErrorMsg(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center my-20">

      {/*  Toast inside JSX */}
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span> Logged in successfully!</span>
          </div>
        </div>
      )}

      <div className="card card-dash bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl mb-4">Login</h2>

          {/* Email Label */}
          <label className="text-sm font-semibold text-gray-700 mb-1">Email ID</label>
          <label className="input validator mb-4">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          {/* Password Label */}
          <label className="text-sm font-semibold text-gray-700 mb-1">Password</label>
          <label className="input validator mb-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
          )}

          {/* Login Button */}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* Signup Redirect */}
          <div className="text-sm text-center mt-2">
            New User?{" "}
            <span
              className="text-blue-500 cursor-pointer font-medium"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
