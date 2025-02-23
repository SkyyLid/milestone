"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/Input";
import { Loader, Lock, Mail, User, Eye, EyeOff, Key } from "lucide-react";
import Link from "next/link";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { useCreateUserMutation } from "@/state/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ToastContainer from "@/components/ToastContainer";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (!name || !email || !password || !recoveryCode) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      //creating the user
      await createUser({
        username: name,
        email,
        password,
        recoveryCode,
      }).unwrap();

      // Show success toast
      toast.success("SignUp Successful!");

      setTimeout(() => {
        router.push("/home");
      }, 2000);

    } catch (error: any) {
      // Handle specific errors
      if (error?.status === 400 && error?.data?.message === "User already exists with this email.") {
        toast.error("User already exists with this email!");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-gray-800 shadow-xl sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <div className="p-8">
          <h2 className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-center text-4xl font-bold text-transparent">
            Create Account
          </h2>
          {error && <div className="mb-4 text-lg text-red-500">{error}</div>}
          <form onSubmit={handleSignUp}>
            <Input
              icon={User}
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Recovery Code Input */}
            <Input
              icon={Key}
              type="text"
              placeholder="Password Change Key (note down)"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
            />
            {/* Password Input */}
            <div className="relative mb-6">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-6 w-6 text-green-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 bg-opacity-50 py-2 pl-10 pr-3 text-lg text-white placeholder-gray-400 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6 text-gray-500" />
                ) : (
                  <Eye className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>

            <PasswordStrengthMeter password={password} />
            <motion.button
              className="mt-5 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-bold text-white shadow-lg transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>
        <div className="flex justify-center bg-gray-900 px-8 py-4">
          <p className="text-lg text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-green-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
