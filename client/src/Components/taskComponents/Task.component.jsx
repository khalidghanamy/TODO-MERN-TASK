import TaskDetails from "./ViewTask";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditeTask from "./EditTask";
import useTasks from "../../store/Task";
import DeleteTask from "./DeleteTask.jsx";
import Logout from "../AuthComponents/Logout.jsx";
const Task = ({task ,setUpdateList}) => {
 

    return ( 
        <>
            <Card className="container" >
         
                <div className="row">
             
               <div className="col-4">
                    <Card.Title>{task.title}</Card.Title>
                    </div>
                <div className="row col-8 justify-content-evenly">
                
                
                    <div className="col-1 ">
                    <TaskDetails  task={task}/> 
                    </div>
                    <div className="col-1 ">
                    <EditeTask  task={task} setUpdateList={setUpdateList}/> 
                    </div>

                    <div className="col-1 ">
                    <DeleteTask task={task}/>
                    </div>
                    
                    </div>
                    </div>
                    
                
                
            </Card>
               
            
        </>
     )
}

export default Task;