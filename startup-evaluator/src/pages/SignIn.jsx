import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; // Ensure correct path to your firebase.js

const SignIn = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to homepage or dashboard after login
    } catch (err) {
      setError("Invalid email or password.");
      console.error("Login error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-gray-800/30 to-gray-900/30 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float animation-delay-2000"></div>

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-semibold text-white hover:text-gray-300">
              PitchPilot
            </Link>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 shadow-2xl">
            <h1 className="text-2xl font-light text-white text-center mb-6">Welcome back</h1>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 py-3 text-lg font-medium">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-white hover:text-gray-300 underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
