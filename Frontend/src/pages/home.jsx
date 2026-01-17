import { useState, useContext } from 'react'
import TodoList from "/src/components/todolist"
import Task from "/src/components/tasks"
import TaskContent from '/src/context/TaskContext'
import API from "../api/axios"

const home = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [priority, setPriority] = useState("all");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);
    const [preference, setPreference] = useState("all");


    const { length, task, fetchTask } = useContext(TaskContent);

    async function deleteTask(tId) {
        await API.delete(`/todo/${tId}`)
        fetchTask()
    }

    function Showtask() {
        setShowPopup(false);
    }


    async function AddTask() {
        if (!title.trim() || !description.trim() || !deadline) {
            alert("Please fill in all required fields!");
            return;
        }
        if (editId == null) {
            await API.post("/todo",{ title, description, deadline, priority });

            setTitle("")
            setDeadline("")
            setDescription("")
            setPriority("")
            setShowPopup(false)
            fetchTask()

        } else {
            await API.put(`/todo/${editId}`, { title, description, deadline, priority });

            setTitle("")
            setDeadline("")
            setDescription("")
            setPriority("")
            setEditId(null)
            setShowPopup(false)
            fetchTask()
        }
    }

    function editTask(tsk) {
        setEditId(tsk._id);
        setTitle(tsk.title);
        setDescription(tsk.description);
        setDeadline(tsk.deadline.split("T")[0]);
        setPriority(tsk.priority);
        setShowPopup(true);
    }

    async function markDone(t) {
        await API.put(`/todo/markDone/${t._id}`, {isCompleted: !t.isCompleted})
        fetchTask();
    }

    return (
        <div className="relative">
            <div className={`createtask ${showPopup ? "blur-sm" : ""}`}>
                <TodoList setPopup={setShowPopup} taskLength={length} />
            </div>

            <div className={`h-[65vh] py-4 bg-blue-100 ${showPopup ? "blur-sm" : ""}`}>
                <div className="pb-2 mx-4 px-4 border-b-2 border-b-blue-500 flex justify-between items-center">
                    <div className='text-2xl text-blue-700 font-semibold'>My Tasks</div>
                    
                    <div className='text-xl text-black font-semibold'>Prority:  {" "}
                        <select className="mt-1 border border-gray-300 rounded-lg p-1 w-35 bg-gray-50 focus:border-blue-500 cursor-pointer" onChange={(e) => setPreference(e.target.value)} value={preference}>
                            <option value="all">All</option>
                            <option value="none">None</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <div className="h-[90%] flex gap-10 overflow-y-scroll mx-4">
                    {task.filter(item => preference == "all" || item.priority === preference)
                        .map((item) => (
                        <Task 
                            key={item._id} 
                            taskId={item._id} 
                            task={item} 
                            deleteTask={() => deleteTask(item._id)} 
                            editTask={() => editTask(item)} 
                            markDone={() => markDone(item)} 
                        />
                    ))}
                </div>
            </div>

            {showPopup
                ?
                <div className="absolute h-120 w-120 top-[20vh] left-[35%] bg-white text-black rounded-xl p-8 z-10 blur-none">
                    <div className="text-center text-3xl font-semibold">{editId == null ? "Add Task" : "Update Task"}</div>

                    <div className="Title mb-4">
                        <div className="text-sm font-semibold text-gray-700">Title</div>
                        <input type="text" className="h-10 w-full bg-gray-200 p-2 outline-none rounded-sm" placeholder="Enter a Task" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                    </div>

                    <div className="Description mb-4">
                        <div className="text-sm font-semibold text-gray-700">Description</div>
                        <textarea className="h-35 w-full bg-gray-200 p-2 outline-none resize-none rounded-sm" onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>
                    </div>

                    <div className="flex gap-14 justify-center items-center">
                        <div className="Description mb-4">
                            <div className="text-sm font-semibold text-gray-700">Deadline</div>
                            <input type="date" className="border border-gray-300 rounded-md p-2 w-45 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => { setDeadline(e.target.value) }} value={deadline} />
                        </div>

                        <div className="Priority mb-4">
                            <div className="text-sm font-semibold text-gray-700">Priority</div>

                            <select className="mt-1 border border-gray-300 rounded-lg p-2 w-45 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => { setPriority(e.target.value) }} value={priority}>
                                <option value="none">None</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <button className="w-50 text-xl px-3 py-2 bg-gray-600 text-white rounded-xl absolute bottom-8 right-8 cursor-pointer" onClick={Showtask}>Back</button>
                    <button className="w-50 text-xl px-3 py-2 bg-blue-400 text-white rounded-xl absolute bottom-8 left-8 cursor-pointer" onClick={AddTask}>{editId == null ? "Add" : "Update"}</button>
                </div>
                : ""}

                <img src="src/assets/8kdb39e5o0n7ocjtpfrvduecsd.png" alt="logo" className='h-8 absolute left-2 top-2'/>
            </div>
    )
}

export default home
