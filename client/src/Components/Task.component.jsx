import { useState ,useEffect} from "react";
import TaskDetails from "./ViewTask";


const Task = ({task }) => {
       


    return ( 
        <>
            <div className="card w-50 " 
            style={{marginLeft:5, marginTop: "10px",backgroundColor:"red" ,width:"20rem",height:"10rem"}}>
           
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text">{task.priority}</p>
                    <TaskDetails task={task}/>
                </div>
            </div>
        </>
     )
}

export default Task;