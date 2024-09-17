import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TodoContext } from "../TodoContext";
export default function Home() {
  const [task, setTask] = useState("");

  const { toggleCompleted, todos, setTodos } = useContext(TodoContext);

  const handleCreate = (e) => {
    e.preventDefault();
    const taskData = { task };

    axios
      .post("http://127.0.0.1:8000/api/task", taskData)
      .then((response) => {
        console.log(response.data);
        fetchTasks(); // Refresh the list of tasks
        setTask(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const fetchTasks = () => {
    axios
      .get("http://127.0.0.1:8000/api/task")
      .then((response) => {
        console.log(response.data);
        setTodos(response.data); // Set tasks from the response
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  const deleteTask = (taskId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/task/${taskId}`)
      .then(() => {
        fetchTasks(); // Refresh the list of tasks
        console.log("Task deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div className="my-10">
      <div className="flex flex-col rounded-lg bg-slate-100 mx-80 py-7">
        <h1 className="mb-10 text-3xl font-semibold text-center text-black">
          Todo App
        </h1>
        <form
          onSubmit={handleCreate}
          className="flex justify-center gap-1 mx-10 mb-6"
        >
          <input
            type="text"
            placeholder="What do we have today?"
            className="w-full input input-bordered input-secondary"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <button
            type="submit"
            className="btn btn-square btn-outline hover:bg-green-600"
            aria-label="Add Task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </form>

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between p-3 mx-10 mb-3 rounded-md bg-slate-200"
          >
            <div
              className={`flex items-center gap-2 ${
                todo.completed ? "line-through text-red-700 " : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
                className="mr-3"
              />
             <p className="font-medium text-gray-900 ">{todo.task}</p> 
            </div>

            <span className="flex gap-4">
              <button
                onClick={() => deleteTask(todo.id)}
                type="button"
                aria-label="Delete Todo"
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
