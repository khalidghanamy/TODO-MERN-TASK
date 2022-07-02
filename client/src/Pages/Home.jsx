import AddTask from "../Components/taskComponents/AddTask.jsx";
import Tasks from "./Tasks";
import { useEffect,useState } from "react";
import useTasks from "../store/Task.js"

function Home() {
  const { tasks, getAllTasks } = useTasks();
  const [taskStatus, setTaskStatus] = useState(["Todo", "InProgress", "UnderReview", "Rework","Completed"]);

  useEffect(() => {
    (async () => {
      await  getAllTasks("62bf03ad6d854ab86aead0c0");
     }
     )();
 
  }, []);
  return (
    <>
        <div className="container p-0 m-0 d-flex justify-content-center">
          <div className="row ">
            <div className="col-lg-4 col-md-8 col-ms-4 d-flex justify-content-md-center p-0 m-0 ">
          <AddTask />
          </div>
          {
            taskStatus.map((task, index) => {
              
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3" key={index}>
                  <Tasks tasks={tasks}  taskStatus={task}/>
                </div>
              );
            }
            )
          }
    
            
           
            
          </div>
          
          
        </div>
        
    </>
  );
}

export default Home;
