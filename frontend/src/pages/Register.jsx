import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#121212] p-8 rounded-2xl border border-[#262626]">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">Create an Account</h2>
          <p className="mt-2 text-center text-sm text-neutral-400">
            Sign up to start chatting right now.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-500" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-[#262626] bg-black text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white focus:z-10 sm:text-sm transition-colors"
                placeholder="Choose a Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
             <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-neutral-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-[#262626] bg-black text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white focus:z-10 sm:text-sm transition-colors"
                placeholder="Create a Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-neutral-500 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-neutral-500 hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSigningUp}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="text-center mt-4">
             <p className="text-sm text-neutral-400">
               Already have an account?{" "}
               <Link to="/login" className="font-medium text-white hover:underline">
                 Log In
               </Link>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
