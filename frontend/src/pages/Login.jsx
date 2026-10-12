import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("cinemind_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
         
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-10">

        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-300 mb-8">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 bg-red-600/20 border border-red-500 text-red-300 p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div className="flex items-center bg-zinc-900 rounded-xl px-4 py-4">

            <FaEnvelope className="text-red-500 mr-3" />

            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="flex items-center bg-zinc-900 rounded-xl px-4 py-4">

            <FaLock className="text-red-500 mr-3" />

            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-white transition disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}

            <FaArrowRight />

          </button>

        </form>

        <p className="text-gray-300 text-center mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="text-red-500 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;