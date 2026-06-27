import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(formData);

        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-amber-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-amber-700 mb-2">
            Welcome Back
            </h1>

            <p className="text-center text-gray-500 mb-8">
            Sign in to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block mb-2 font-medium">
                Email
                </label>

                <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                Password
                </label>

                <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
            </div>

            <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg transition disabled:opacity-50"
            >
                {isLoggingIn ? "Signing In..." : "Sign In"}
            </button>
            </form>
        </div>
        </div>
    );
};

export default LoginPage;