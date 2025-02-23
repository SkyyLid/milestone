"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Input from "@/components/Input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Show loading state

    try {
      // Add your login logic here (e.g., call an API for authentication)
      console.log("Submitted", { email, password });
      // Simulate login API call
      setTimeout(() => {
        setLoading(false); // Stop loading after API call
        // Redirect to dashboard or another page on success
      }, 1500);
    } catch (error) {
      setLoading(false);
      setError("Failed to log in. Please try again.");
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
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />

            {/* Password Input with show/hide functionality */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-6 w-6 text-green-500" /> {/* Icon size adjusted */}
              </div>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 text-lg" 
              />
              {/* Toggle Show Password Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6 text-gray-500" /> // Icon size adjusted
                ) : (
                  <Eye className="h-6 w-6 text-gray-500" /> // Icon size adjusted
                )}
              </button>
            </div>

            <div className="mb-3 flex items-center">
              <Link
                href="/forgot-password"
                className="text-lg text-green-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {error && <div className="mb-4 text-lg text-red-500">{error}</div>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-lg font-bold text-white shadow-lg transition duration-200 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900" // Increase font size for button
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </div>

        <div className="flex justify-center bg-gray-900 bg-opacity-50 px-8 py-4">
          <p className="text-lg text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
