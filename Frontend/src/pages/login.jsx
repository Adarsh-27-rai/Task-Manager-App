import React, {useState, useContext} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import API from '../api/axios'
import TaskContext from '../context/TaskContext'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { fetchTask } = useContext(TaskContext)

  const navigate = useNavigate()
  
  function handleChange(e) {
    const newForm = {...form, [e.target.name]: e.target.value}
    setForm(newForm);
  }

  async function handleLogin() {
    try {
      // localStorage.removeItem("token");
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
      fetchTask();
    } catch (error) {
      console.log(error.response?.data?.message || "Login failed");
    }
  }

  return (  
    <div className="min-h-screen min-w-screen flex relative bg-[url(/planning_app.png)] bg-no-repeat bg-cover">
      <div className="w-full h-fit max-w-md bg-white p-8 rounded-2xl shadow-lg top-50 left-30 absolute">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
