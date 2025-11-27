// SignupPage.tsx
import React, { useState, type FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from '../../store/UserAuth'
import {toast} from 'react-toastify'

interface FormData {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const {login,isLoading, user} = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const navigator = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password)
      navigator('/book-ride')
      toast.success(`Welcome ${user?.name}`)
    } catch (error) {
      toast.error(error.response.data.msg || "Error occured while loging in"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-100 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )} */}
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-2 rounded-md hover:bg-black/80 transition-colors"
          >
            {isLoading ? "loging in...": "Log in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Register as a driver {" "}
          <a href="/signup/as-driver" className="text-blue-500 hover:underline">
            Sign up as a Driver
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
