import { FaEdit, FaTrashAlt, FaRegCheckCircle, FaUndoAlt } from 'react-icons/fa';

const Task = ({ task,deleteTask,editTask,markDone }) => {
  if (!task) return null;

  function formDate(d) {
    const dt = d.split("T")[0];
    const [year, month, date] = dt.split("-");
    const todayDate = `${date}/${month}/${year}`;
    return todayDate;
  }

  function deleteItem() {
    deleteTask();
  }
  

  function editItem() {
    editTask();
  }

  function toggledone() {
    markDone();
  }


  function displayPriority(p) {
    if (p == "high") {
      return {
        border: "border-t-red-500",
        text: "text-red-500",
        bg: "bg-red-200"
      }
    } else if (p == "medium") {
      return {
        border: "border-t-yellow-500",
        text: "text-yellow-500",
        bg: "bg-yellow-200"
      }
    } else if (p == "low") {
      return {
        border: "border-t-green-500",
        text: "text-green-500",
        bg: "bg-green-200"
      }
    } else {
      return {
        border: "border-t-blue-500",
        text: "text-blue-500",
        bg: "bg-blue-200"
      }
    }
  }

  const priority = displayPriority(task.priority)
  
  return (
    <div className={`h-70 w-80 min-w-80 min-h-fit p-4 mx-2 my-8 bg-white border-t-6 rounded relative ${task.isCompleted ? "border-gray-400" : priority.border}`}>
      {/* this section is for main div containers */}
      <div className={`h-8 min-h-fit w-fit px-5 py-1 mt-4 text-lg rounded-3xl flex justify-center items-center ${task.isCompleted ? "bg-gray-400 line-through" : priority.bg}`}>
        {task.title}
      </div>
      <div className={`text-md p-1 min-h-fit text-blue-500 font-semibold ${task.isCompleted ? "text-gray-500" : priority.text}`}>
        Due: {formDate(task.deadline)}
      </div>
      <div className={`text-2xs px-1 min-h-fit mb-9 4 ${task.isCompleted ? "line-through text-gray-500" : ""}`}>
        {task.description}
      </div>

      {/* this section is for absolute div */}
      <div className={`h-6 w-40 absolute bottom-5 right-5 cursor-pointer flex gap-4 justify-end`}>
        {task.isCompleted 
        ?
        <FaUndoAlt className={`h-6 w-fit font-semibold cursor-pointer transition-all duration-300 ease-in-outhover:scale-110 hover:rotate-12 ${task.isCompleted ? "text-gray-400" : priority.text}`} onClick={toggledone}/>
        :
        <FaRegCheckCircle className={`h-6 w-fit font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-12 ${task.isCompleted ? "text-gray-400" : priority.text}`} onClick={toggledone}/>
        }
        <FaEdit className={`h-6 w-fit cursor-pointer hover:scale-105 ${task.isCompleted ? "text-gray-400" : priority.text}`} 
        onClick={editItem}/>
        <FaTrashAlt className={`h-6 w-fit cursor-pointer hover:scale-90 ${task.isCompleted ? "text-gray-400" : priority.text}`} 
        onClick={deleteItem}/>
      </div>
      
      <div className={`text-xs p-1 min-h-fit font-semibold absolute top-0 right-2 ${task.isCompleted ? "text-gray-500" : priority.text}`}>
        created: { formDate(task.createdAt) }
      </div>
    </div>
  )
}

export default Task
