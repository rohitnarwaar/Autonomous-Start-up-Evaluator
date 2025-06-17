import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { auth } from "@/firebase"; // make sure this path is correct
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      navigate("/"); // Redirect to homepage or dashboard after signup
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please check your details.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 via-gray-800/30 to-gray-900/30 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float animation-delay-2000"></div>

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-semibold text-white hover:text-gray-300 transition-colors">
              PitchPilot
            </Link>
          </div>

          {/* Sign Up Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 shadow-2xl">
            <h1 className="text-2xl font-light text-white text-center mb-8">
              Create your account
            </h1>

            <form className="space-y-6" onSubmit={handleSignUp}>
              <div>
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>

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
                  placeholder="Create a password"
                  className="mt-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-100 py-3 text-lg font-medium"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/signin" className="text-white hover:text-gray-300 underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
