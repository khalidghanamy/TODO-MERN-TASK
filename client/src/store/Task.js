import create from 'zustand';
import {getTasks, createTask,updateTask ,deleteTask,getTask} from '../Storage/api/taskApi.js'


const useTasks = create(set => ({
    tasks: [],
    task: {},
    getAllTasks: async (userId)=>{
        const data = await getTasks(userId);
        console.log(data);
        set(state => ({ tasks:data}))
        return data
    }
    ,
    createTask: async (newTask,userId) => {
        try{

        const {data} = await createTask(newTask,userId);
        
        set(state => ({ tasks: [...state.tasks, data]}))
        return data
        }catch(err){
            return  err.response.data
        }
    },
    updateTask: async (id, updatedData) => {
        try{

            const {data} = await updateTask(id, updatedData);
    
            set(state => ({ tasks: state.tasks.map(task =>{ 
                console.log(task.id ===data.task.id );
                
                return task.id === data.task.id ? data.task : task})}))
         
        }catch(err){
            return err.response

        }
    }
    ,
    deleteTask: async (id) => {
        try{
            const {data}= await deleteTask(id);
            console.log(data);
            set(state => ({ tasks: state.tasks.filter(task => task.id !== id)}))
            return data
        }catch(err){
            return err.response.data
        }

    }
    ,
    getTask: async (id) => {
        const data = await getTask(id);
        set(state => ({ task: data}))
    }

    
}));


export default useTasks;