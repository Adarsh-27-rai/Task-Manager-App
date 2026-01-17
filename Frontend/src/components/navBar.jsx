import { useNavigate, NavLink } from 'react-router-dom'
import TaskContent from '/src/context/TaskContext'
import { useContext } from 'react'


const Navbar = () => {

    const navigate = useNavigate();
    const { setTasks } = useContext(TaskContent);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login", {replace: true});
        setTasks([]);
    }

  return (
    <div>
        <div className="absolute h-12 w-120 top-2 right-6 flex justify-end items-center gap-8 z-10">
            <NavLink to="/" className={({ isActive }) => 
                isActive ? 'h-8 width-fit px-2 text-lg cursor-pointer border-b-3 border-blue-600' : 
                'h-8 width-fit px-2 text-lg hover:border-b-3 hover:border-purple-600 cursor-pointer transition-all duration-100 ease-in-out'
                }> Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => 
                isActive ? 'h-8 width-fit px-2 text-lg cursor-pointer border-b-3 border-blue-600' : 
                'h-8 width-fit px-2 text-lg hover:border-b-3 hover:border-purple-600 cursor-pointer transition-all duration-100 ease-in-out'}>
                About
            </NavLink>
            <NavLink to="/mytasks" className={({ isActive }) => 
                isActive ? 'h-8 width-fit px-2 text-lg cursor-pointer border-b-3 border-blue-600' : 
                'h-8 width-fit px-2 text-lg hover:border-b-3 hover:border-purple-600 cursor-pointer transition-all duration-100 ease-in-out'}> 
                My Tasks
            </NavLink>
            {!localStorage.getItem("token") ? 
                <NavLink to="/login" className={({ isActive }) => 
                isActive ? "h-10 w-18 bg-blue-500 text-lg text-white rounded-xl cursor-pointer flex justify-center items-center" : 
                "h-10 w-18 flex justify-center items-center bg-gray-500 text-lg text-white rounded-xl cursor-pointer hover:bg-purple-500 transition-all duration-150 ease-in-out"}>
                logIn
            </NavLink> 
            :
            <button className="h-10 w-20 flex justify-center items-center bg-red-400 text-lg text-white rounded-xl cursor-pointer hover:bg-orange-300 transition-all duration-150 ease-in-out"
            onClick={handleLogout}>
                Logout
            </button>
            } 
            {/* isActive is a function provided by react-router-dom which checks if a the required link is active or not */}
       </div>
    </div>
  )
}

export default Navbar

