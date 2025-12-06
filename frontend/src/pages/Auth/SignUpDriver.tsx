// SignupPage.tsx
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../store/UserAuth"
import { toast } from 'react-toastify';
import { motion} from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile_number:string;
  nin:string,
  vehicle_number:string;
  capacity:string;
  photo:string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  mobile_number?:string;
  
}

const SignupPageDriver: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_number: "",
    nin:"",
    vehicle_number:"",
    capacity:"",
    photo:"",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [vehicleType, setVehicleType] = useState("");
  const navigator = useNavigate();
  const {signUp, isLoading, error} = useAuthStore();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSelectVehicleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setVehicleType(e.target.value);
    };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email address";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.mobile_number.trim()) newErrors.mobile_number = "mobile number is required";
    return newErrors;
  };

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    try {
      if (Object.keys(validationErrors).length === 0) {
        console.log(formData, vehicleType)
        await signUp(
          formData.email,
          formData.password,
          formData.name,
          "driver",
          formData.mobile_number,
          formData.nin,
          formData.vehicle_number,
          vehicleType,
          Number(formData.capacity)
        )
        navigator('/login')
         toast.success(`Sign up successful`)
      
    }
    } catch (error) {
      toast.error(error.response.data.msg || "Error occured while registering");
      setErrors(validationErrors);
      console.log(error)
    }
   
  };

  return (
    <motion.div 
    variants={fadeUp}
    initial='hidden'
    whileInView='show'
    className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-100 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register as Driver</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium">nin</label>
            <input
              type="text"
              name="nin"
              value={formData.nin}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors}</p>
            )} */}
          </div> <div>
            <label className="block text-sm font-medium">vehicle type</label>
            <select
              className="w-full p-3 mt-4 bg-gray-100 rounded-xl outline-none cursor-pointer
                    border-2 border-transparent focus:border-black focus:bg-white"
             value={vehicleType} onChange={handleSelectVehicleType} name="vehicle_type">
                <option disabled>choose vehicle type</option>
                <option value="bus" >bus</option>
                <option value="keke" >keke</option>
            </select>
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )} */}
          </div> <div>
            <label className="block text-sm font-medium">vehicle number</label>
            <input
              type="text"
              name="vehicle_number"
              value={formData.vehicle_number}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )} */}
          </div> <div>
            <label className="block text-sm font-medium">capacity</label>
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )} */}
          </div> 
          <div>
            <label className="block text-sm font-medium">mobile number</label>
            <input
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="+234 9087"
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.mobile_number && (
              <p className="text-red-500 text-sm">{errors.mobile_number}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">photo</label>
            <input
              type='file'
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )} */}
          </div>
          <div>
            <label className="block text-sm font-medium">password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-2 rounded-md hover:bg-black/80 transition-colors"
          >
            {isLoading ? "registering...": "register as a Driver"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          Register as a driver {" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up 
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPageDriver;
