import Task from "../Models/Task.js"; 
import User from "../Models/User.js";


const checkUser = async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
    }
    
}



export const createTask = async (req, res,next) => {

    const {description,startedAt,finishedAt} = req.body;
    const {userId} = req.params;
    try{
        //check if user exist in database
       await checkUser(req,res,next);
        //create task
        await Task.create({
            description,
            status: "Todo",
            user: userId,
            startedAt,
            finishedAt
        })

        return res.json({ msg: 'Task has been created' });

    }catch(error){
        next(error);
    }


}


export const getTasks = async (req, res,next) => {
    
    const {userId} = req.params;
        try{
            //check if user exist in database
        await checkUser(req,res,next);
            //get tasks
            const tasks = await User.findById(userId).populate("tasks");
            return res.json(tasks);
    
        }catch(error){
            next(error);
        }
    }

    export const getOneTask = async (req, res,next) => {
        const {id} = req.params;
        try{
            //check if user exist in database
        await checkUser(req,res,next);
            
            //get task
            const task = await Task.findById(id);
            return res.json(task);
            
        }catch(error){
            next(error);
        }
    }


    export const updateTask = async (req, res,next) => {
        const {id} = req.params;
        const {description,status,finishedAt} = req.body;
        try{
            //check if user exist in database
        await checkUser(req,res,next);
            //update task
            const task = await Task.findByIdAndUpdate(id,{
                description,
                status,
                finishedAt
            },{new:true});
            return res.json(task ,{msg: "Task has been updated"});
    
        }catch(error){
            next(error);
        }
    }

    export const deleteTask = async (req, res,next) => {
        const {id} = req.params;
        try{
            //check if user exist in database
        await checkUser(req,res,next);
            //delete task
            const task = await Task.findByIdAndDelete(id);
            User.findByIdAndUpdate(task.user,{$pull: {tasks: task._id}});

            return res.json({msg: "Task has been deleted"});
    
            
        }catch(error){
            next(error);
        }
    }