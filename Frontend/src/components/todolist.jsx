import {useEffect, useState} from 'react'
import API from "../api/axios"

const TodoList = ({ setPopup,taskLength }) => {
  function Popup() {
    setPopup(true);
  }

  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try{
        const res = await API.get("/auth/me")
        setUserName(res.data.name); 
      } catch (error) {
        console.log("failed to fetch", error)
      }
    }

    fetchUser();
    
  }, [])


   
  return (
    <div className="h-[35vh] p-8 bg-gray-200 flex flex-col gap-4 items-start justify-center relative">
        <h3 className="text-5xl font-semibold text-blue-700">Hello, {userName}</h3>
        <div className="text-xl text-gray-700">You have {taskLength ?? 0} pending tasks</div>
        <button className="h-12 w-40 bg-blue-600 text-xl text-white rounded-lg cursor-pointer outline-none border-0 hover:border-2 hover:border-blue-300 hover:shadow-sm hover:shadow-blue-300" onClick={Popup}>Add New Task</button>

        <div className="absolute top-20 right-5">
          <li className='marker:text-blue-500 marker:text-2xl text-lg'> 
            <span className="transition-opacity duration-300">None</span>
          </li>
          <li className='marker:text-red-500 marker:text-2xl text-lg'> 
            <span className="transition-opacity duration-300">High</span>
          </li>
          <li className='marker:text-yellow-500 marker:text-2xl text-lg'> 
            <span className="transition-opacity duration-300">Medium</span>
          </li>
          <li className='marker:text-green-700 marker:text-2xl text-lg'> 
            <span className="transition-opacity duration-300">Low</span>
          </li>
        </div>
    </div>
  )
}

export default TodoList
