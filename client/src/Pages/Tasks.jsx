import { useState ,useEffect} from "react";

import Task from "../Components/Task.component.jsx";
const Tasks = () => {
    const data =[
        {
            id: 1,
            title: "Task 1",
            description: "This is task 1",
            status: "In Progress"
        }
    ]

    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        setTasks(data);
    }
    , [])

    return ( 
        <>
           {tasks.map(task => (
                <Task key={task.id} task={task} />
                ))}
        

        
        
        </>
     )
}

export default Tasks;