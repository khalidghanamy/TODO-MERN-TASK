import AddTask from "../Components/taskComponents/AddTask.jsx";
import Tasks from "./Tasks";
import { useEffect,useState } from "react";
import useTasks from "../store/Task.js"
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from 'react-router-dom'
function Home() {
  const { tasks, getAllTasks } = useTasks();
  const [taskStatus, setTaskStatus] = useState(["Todo", "InProgress", "UnderReview", "Rework","Completed"]);
  const [updateTasks ,setUpdateTasks] = useState(0)
const navigate = useNavigate()  

  useEffect(()=>{
    
    if(!localStorage.getItem("task-user")){
        navigate("/login")
    }
  },[])
  console.log(updateTasks);
  const user = JSON.parse(localStorage.getItem("task-user"))
    

  console.log(tasks.length);
  
  useEffect(() => {
    (async () => {
      await  getAllTasks(user._id);
     }
     )();
 
  }, [tasks.length]);
  return (
    <>
        {tasks.length>0 &&<div className="container p-0 m-0">
          <div className="row">
          <NavBar/>
          </div>
          <div className="row mt-5 d-flex justify-content-center">
            <div className="mt-5 d-flex justify-content-center">
          <AddTask setUpdateTasks={setUpdateTasks}/>
          </div>
          </div>
          <div className="row" style={{marginRight:"5.1rem"}}>
           
          {
            taskStatus.map((task, index) => {
              
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
                  <Tasks tasks={tasks}  taskStatus={task} key={index}/>
                </div>
              );
            }
            )
          }
    
            
           
            
          </div>
          
          
        </div>}
        
    </>
  );
}

export default Home;
