import {useState,useEffect} from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import useTasks from '../../store/Task';
import {AiFillEdit} from 'react-icons/ai';
function EditeTask({task}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [taskData, setTaskData] = useState(task);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
        ...task, title: e.target.title.value,
        description: e.target.description.value,
        priority: e.target.priority.value,
        status: e.target.status.value,
        startedAt: e.target.startedAt.value? e.target.startedAt.value : task.startedAt,
        finishedAt: e.target.finishedAt.value? e.target.finishedAt.value : task.finishedAt,
    };
    console.log(newTask);
    updateTask(task.id,newTask);
    }

    const {updateTask} = useTasks()
    return (
      <>
        <Button variant="success"className='m-2' onClick={handleShow}>
            <AiFillEdit/>
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
           <div className="card ">
        <div className="card-header">
            <h3>Edite Task</h3>
        </div>
      <Form onSubmit={(e) => handleSubmit(e)}
      className="card-body">
    
      
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control id="description"
            name="description"
            required
            type="text"
            onChange={(e)=>setTaskData({...taskData,description:e.target.value})}
            value={taskData.description} />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control id="title" 
            name="title"
            required
            maxLength="5"
            type="text"
            onChange={(e)=>setTaskData({...taskData,title:e.target.value})}
            value={taskData.title} />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="startedAt">Start At</Form.Label>
            <Form.Control id="startedAt" 
            name="startedAt" 
            type="dateTime-local"
            onChange={(e)=>setTaskData({...taskData,startedAt:e.target.value})}
            value={taskData.startedAt} />
          </Form.Group>
          {/* ======================================================== */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="finishedAt">Finished At</Form.Label>
            <Form.Control id="finishedAt" 
            name="finishedAt"
            type="dateTime-local"
            onChange={(e)=>setTaskData({...taskData,finishedAt:e.target.value})}
            value={taskData.finishedAt} />
          </Form.Group>
          {/* ======================================================== */}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="priority">Priority</Form.Label>
            <Form.Select id="priority"
            name="priority"
            onChange={(e)=>setTaskData({...taskData,priority:e.target.value})}
            value={taskData.priority}
            >
              <option value="Low" defaultValue="Low">
                Low
              </option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Form.Group>
          {/* ======================================================== */}

          <Form.Group className="mb-3">
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Select id="status"
            name="status"
            onChange={(e)=>setTaskData({...taskData, status:e.target.value})}
            value={taskData.status}
            >
              <option value="Todo">
                Todo
              </option>
              <option value="In progress">In progress</option>
              <option value="Rework">Rework</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
          {/* ======================================================== */}


          <Modal.Footer>
          <Button type="submit">Submit</Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            
          </Modal.Footer>
        </fieldset>
      </Form>

    </div>
        </Modal>
      </>
    );
  }
  
    export default EditeTask;