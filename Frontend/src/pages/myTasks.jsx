import { FaTrashAlt, FaRegCheckCircle } from 'react-icons/fa';
import { useContext, useState } from 'react'
import TaskContext from '/src/context/TaskContext'

const myTasks = () => {
  const { task } = useContext(TaskContext);
  const [priority, setPriority] = useState("all");

  function displayPriority(p) {
    if (p == "high") {
      return {
        border: "border-l-red-500",
        text: "text-red-500",
        bg: "bg-red-200"
      }
    } else if (p == "medium") {
      return {
        border: "border-l-yellow-500",
        text: "text-yellow-500",
        bg: "bg-yellow-200"
      }
    } else if (p == "low") {
      return {
        border: "border-l-green-500",
        text: "text-green-500",
        bg: "bg-green-200"
      }
    } else {
      return {
        border: "border-l-blue-500",
        text: "text-blue-500",
        bg: "bg-blue-200"
      }
    }
  }

  return (
    <div className='h-screen bg-gray-200 relative'>
      <div className='h-[80%] w-[80%] p-5 bg-white absolute top-20 left-35 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.25)]'>
        <div className="w-full border-b-3 p-2 flex justify-between items-center">
          <div className='text-2xl font-semibold'>My Tasks</div>
          <div className='text-lg'>Prority: {"  "} 
            <select className="mt-1 border border-gray-300 rounded-lg p-1 w-35 text-md bg-gray-50 focus:border-blue-500 cursor-pointer" onChange={(e) => setPriority(e.target.value)} value={priority}>
                <option value="all">All</option>
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className='myTask h-[90%] w-full p-2 overflow-y-scroll'>
          {/* all the tasks */}
          {task
            .filter(item => priority === "all" || item.priority === priority)
            .map(item => (
              <div key={item.id} className={`h-12 min-h-fit my-4 px-8 py-2 w-full rounded-2xl bg-gray-100 flex justify-between items-center border-l-5 ${displayPriority(item.priority).border}`}>
                <div className="currentTask w-80">
                  <div className={`text-lg font-semibold text-blue-700 ${displayPriority(item.priority).text}`}>{item.title}</div>
                  <div className={`text-2xs text-blue-700 ${displayPriority(item.priority).text}`}>{item.description}</div>  
                </div>
                <div className="dueDate w-fit">
                  <div className={`text-lg text-blue-700 font-semibold ${displayPriority(item.priority).text}`}>Due: {item.deadline.split("T")[0]}</div>
                </div>
                <div className={`function flex justify-center item-center gap-5 text-2xl ${displayPriority(item.priority).text}`}>
                  <FaRegCheckCircle />
                  <FaTrashAlt />           
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="absolute top-140 right-5">
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

export default myTasks
