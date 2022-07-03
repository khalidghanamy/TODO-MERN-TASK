import AddTask from "../Components/taskComponents/AddTask.jsx";
import Tasks from "./Tasks";
import { useEffect,useState } from "react";
import useTasks from "../store/Task.js"
import NavBar from "../Components/NavBar.jsx";
import {useNavigate} from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Home() {
  const { tasks, getAllTasks } = useTasks();
  const [taskStatus, setTaskStatus] = useState(["Todo", "InProgress", "UnderReview", "Rework","Completed"]);
const navigate = useNavigate()  
const [user, setUser] = useState(undefined);

const [tasksTest,setTasksTest]=useState(tasks)
const [updateList,setUpdateList]=useState(0)
useEffect(() => {
   function getMe() {
    if (!localStorage.getItem("task-user")) {
      navigate("/login");
    }
    
     
  }
  getMe();
}, []);


  



useEffect(() => {
  (async () => {
    const user = JSON.parse(localStorage.getItem("task-user"));
    setUser(user);
  
     const data = await  getAllTasks(user._id);
     console.log("=========home=====",data)
     console.log("=========home=====")
     setTasksTest(data)
     }
     )();
 
  }, [tasks.length,updateList]);
  return (
    <>
        {<div className="container p-0 m-0">
          <div className="row">
          <NavBar/>
          </div>
          <div className="row mt-5 d-flex justify-content-center">
            <div className="mt-5 d-flex justify-content-center">
          <AddTask setUpdateList={setUpdateList}/>
          </div>
          </div>
          <DragDropContext >
          <div className="row" style={{marginRight:"5.1rem"}}>
           
          {tasks.length>0&&
            taskStatus.map((task, index) => {
              
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
                  <Tasks tasks={tasksTest}  taskStatus={task} key={index} setUpdateList={setUpdateList} updateList={updateList}/>
                </div>
              );
            }
            )
          }
    
            
           
            
          </div>
          </DragDropContext>
          
          
        </div>}
        
    </>
  );
}

export default Home;
