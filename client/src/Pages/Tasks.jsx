import { useState ,useEffect} from "react";
import Card from "react-bootstrap/Card";
import Task from "../Components/taskComponents/Task.component.jsx";
import useTasks from '../store/Task.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const Tasks = ({tasks,taskStatus}) => {
const [filteredTasks, setFilteredTasks] = useState([]);
    const CheckStatus = () => {
        const filteredTasks =tasks.filter(task => task.status === taskStatus);
        return filteredTasks;
    }

    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }}

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
            <Card.Body>
                <DragDropContext >
                    <Droppable droppableId="droppable">


          { (provided)=>(
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
          {filteredTasks.map((task,index) => (
            <Draggable key={task.id} draggableId={task.id.toString()} index={index} >
                {(provided) => (
                    <div ref={provided.innerRef}
                     {...provided.draggableProps} 
                     {...provided.dragHandleProps}

                    key={task.id}>
                    
                
            
                <Task task={task} />

            
            </div>
            )}
            </Draggable>
                ))}
                </div>
                )}
                    </Droppable>
                </DragDropContext>
            </Card.Body>
                </Card>
        

        
        
        </>
     )
}

export default Tasks;