import { useState,useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/navBar'
import Home from './pages/home'
import About from './pages/About'
import MyTasks from './pages/myTasks'
import Login from './pages/login'
import Signup from './pages/signup'
import TaskContext from '/src/context/TaskContext'
import ProtectedRoute from './components/protectedRoutes'
import API from './api/axios'
import './App.css'

function App() {
  const [task, setTasks] = useState([]);
  const [length, setLength] = useState(0);

  // useEffect(() => {
  //   const storedTasks = localStorage.getItem("task");
  //   if (storedTasks) {
  //       setTasks(JSON.parse(storedTasks))
  //   }
  // }, []);

  async function fetchTask() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await API.get("/todo");
    setTasks(res.data);
  }

   function task_length() {
        let count = 0;
        task.map(item => item.isCompleted == false && count++)
        setLength(count);
    }

  useEffect(() => {
    fetchTask();
  }, [])

  useEffect(() => {
    task_length()
  }, [task])

  return (
    <div className="relative">
      <TaskContext.Provider value = {{length, task, setTasks, fetchTask}}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            } 
            />
          <Route path="/about" element={<About />} />
          <Route path="/mytasks" element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
            
            } 
            />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </TaskContext.Provider>
    </div>

  )
}

export default App
