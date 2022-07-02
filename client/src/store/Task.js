import create from 'zustand';
import {getTasks, createTask,updateTask ,deleteTask,getTask} from '../Storage/api/taskApi.js';


const useTasks = create(set => ({
    tasks: [],
    task: {},
    getAllTasks: async (userId)=>{
        const data = await getTasks(userId);
        set(state => ({ tasks:data}))
    }
    ,
    createTask: async (newTask,userId) => {
        const data = await createTask(newTask,userId);
        console.log(data);
        set(state => ({ tasks: [...state.tasks, data]}))
    },
    updateTask: async (id, updatedData) => {
        const {data} = await updateTask(id, updatedData);
        console.log(data.task);
        
        set(state => ({ tasks: state.tasks.map(task =>{ 
            console.log(task.id ===data.task.id );
            return task.id === data.task.id ? data.task : task})}))
    }
    ,
    deleteTask: async (id) => {
        await deleteTask(id);
        set(state => ({ tasks: state.tasks.filter(task => task.id !== id)}))
    }
    ,
    getTask: async (id) => {
        const data = await getTask(id);
        set(state => ({ task: data}))
    }

    
}));


export default useTasks;