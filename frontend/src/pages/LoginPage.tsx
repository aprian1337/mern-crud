import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/auth/login`,
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setIsSuccess(true);

        localStorage.setItem("token", response.data.data.token);

        navigate("/email");
      } else {
        setPassword("");
        setMessage(response.data.error);
        setIsSuccess(false);
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message || "Login failed");
      } else {
        setMessage("An error occurred while logging in.");
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-2 text-center rounded-md ${
              isSuccess
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
