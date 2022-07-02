import Task from "./Task.component";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useTasks from "../../store/Task.js";
import Logout from "../AuthComponents/Logout.jsx";
const AddTask = ({ addTask }) => {

  const [task, setTask] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      priority: e.target.priority.value,
    };

    console.log(newTask);
    createTask(newTask,"62bf03ad6d854ab86aead0c0");
    setTask(newTask);
   
  };

  const {createTask} = useTasks()


  return (
    <div className="card w-50">
        <div className="card-header">
            <h3>Add Task</h3>
        </div>
      <Form onSubmit={(e) => handleSubmit(e)}
      className="card-body">
           <Logout/>
    
      
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control id="description"
            name="description"
            required
            type="text"
             placeholder=" description" />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control id="title" 
            name="title"
            required
            maxLength="5"
            type="text"

            placeholder="Title" />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="startedAt">Start At</Form.Label>
            <Form.Control id="startedAt" 
            name="startedAt" 
            type="dateTime-local"

            placeholder="startedAt" />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="startAt">Finished At</Form.Label>
            <Form.Control id="finishedAt" 
            name="finishedAt"
            type="dateTime-local"

            placeholder="finishedAt" />
          </Form.Group>
          {/* ======================================================== */}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="priority">Priority</Form.Label>
            <Form.Select id="priority"
            name="priority"
            >
              <option value="Low" defaultValue="Low">
                Low
              </option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>
          {/* ======================================================== */}


          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>

    </div>
  );
};

export default AddTask;
