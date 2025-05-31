import { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EmailOTPVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    const val = element.value.replace(/\D/, "");
    if (val) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    try {
      setIsVerifying(true);
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/verifyEmail",
        { code: finalOtp },
        { withCredentials: true }
      );

      console.log(response);
      toast.success("Email verified successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Invalid or expired OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const resendOTP = () => {
    toast.success("A new OTP has been sent to your email.");
  };

  return (
    <Card className="max-w-sm mx-auto mt-20 shadow-xl rounded-2xl border border-gray-200">
      <CardContent className="p-8">
        <form className="space-y-6" onSubmit={verifyOtp}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">Verify Your Email</h2>
            <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email address.</p>
          </div>

          <div className="flex justify-between gap-2 mt-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                disabled={isVerifying}
                className="w-12 h-14 text-center font-semibold text-lg border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg transition-all"
              />
            ))}
          </div>

          <Button type="submit" className="w-full mt-4 bg-blue-500 text-white" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="text-center text-sm mt-2">
            Didn’t receive the code?{" "}
            <Button variant="link" type="button" onClick={resendOTP} className="p-0 h-auto text-blue-600 font-medium">
              Resend OTP
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
