import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'

const Signup = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  function handleChange(e) {
    const newForm = { ...form, [e.target.name]: e.target.value }
    setForm(newForm);
  }

  async function handleSignup() {
    try {
      localStorage.removeItem("token");
      await API.post("/auth/signup", form);
      console.log(form);
      navigate("/login");
      alert("Sign Up Successful!");
    } catch (error) {
      console.log(error.response?.data?.message || "Signup failed");
      alert("Signup failed")
    }

  };


  return (
    <div className='h-screen w-screen bg-gray-100'>
      <div className="min-h-screen relative bg-gray-100 bg-[url(/planning_app.png)] bg-cover bg-no-repeat">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg absolute top-50 left-30">
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
