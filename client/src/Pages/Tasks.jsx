import { useState ,useEffect} from "react";
import Card from "react-bootstrap/Card";
import Task from "../Components/taskComponents/Task.component.jsx";
import useTasks from '../store/Task.js'

const Tasks = ({tasks,taskStatus}) => {
const [filteredTasks, setFilteredTasks] = useState([]);
    const CheckStatus = () => {
        const filteredTasks =tasks.filter(task => task.status === taskStatus);
        return filteredTasks;
    }

    useEffect(() => {
        setFilteredTasks(CheckStatus());
    }
    , [taskStatus]);



console.log(taskStatus);
    return ( 
        <>
            <Card className="p-0 m-5 w-100 h-100">
                <Card.Header>
                    <Card.Title className="d-flex justify-content-center"> {taskStatus} </Card.Title>
                </Card.Header>
           {filteredTasks.map((task,index) => (
            <div key={index} className="m-1">
                <Task task={task} />

            </div>
                ))}
                </Card>
        

        
        
        </>
     )
}

export default Tasks;