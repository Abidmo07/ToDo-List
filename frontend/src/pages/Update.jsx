import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom";


export default function Update() {
  const[task,setTask]=useState('');
  const {taskId}= useParams();

  return (
    <div className="flex justify-center items-center my-10">
      <input
  type="text"
  placeholder="Type here"
  className="input input-bordered input-success w-full max-w-xs" 
  onChange={(e)=>{setTask(e.target.value)}}
  value={task}/>
  <button onClick={()=>{
    const todoData={
      task:task
    }
    axios.put("http://127.0.0.1:8000/api/task/"+taskId,todoData).then((response)=>{
      setTask(response.data.task);
      console.log(response.data.task)
    })
  }} type="submit">Edit</button>
    </div>
  )
}
