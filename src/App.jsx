import { Provider } from "react-redux";
import "./App.css";
import { appStore } from "./utils/appStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Home from "./components/Home";
import PredictorSearchBar from "./components/PredictorSearchBar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import QRgeneration from "./components/QRgeneration";
import EmailOTPVerify from "./components/EmailOTPVerify";
import { Toaster } from "sonner";  

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Toaster richColors position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/emailVerify" element={<EmailOTPVerify />} />
          <Route path="/" element={<Home />}>
            <Route path="/body" element={<Body />} />
            <Route path="/predictor" element={<PredictorSearchBar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/qrGenerator" element={<QRgeneration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
