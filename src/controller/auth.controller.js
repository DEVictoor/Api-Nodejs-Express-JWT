import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import Task from '../models/Task'
// import { removeAllListeners } from 'nodemon';

export const signup = async (req, res) => {

    try {
        const { username, email, password, role , tasks } = req.body;

        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })
    
        //Roles 
        if (role) {
            const foundRole = await Role.find({ name: role  })
            //esto es opcional, para comprobar los roles que memad
            newUser.role = foundRole._id
        } else {
            const role = await Role.findOne({ name: "user" })
            newUser.role = [role._id]
        }

        //Task
        if (tasks) {
            const foundTasks = await Task.find({ name: { $in: tasks } })
            newUser.tasks = foundTasks.map((e) => e._id);
        } else {
            const task = await Task.findOne({ name: "about" })
            newUser.tasks = [task._id]
        }
    
        //Salvando user
        const savedUser = await newUser.save();
        console.log(savedUser);
    
        const token = jwt.sign({ id: savedUser._id }, config.key, {
            expiresIn: 86400 //24 horas
        })
    
        await newUser.save();
    
        res.status(200).json({token})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
 
}

export const signin = async (req, res) => {
    
    try {
    
        const userFound = await User.findOne({ email: req.body.email }, { password: 1, idrole: 1 }).populate("idrole");
        
        if (!userFound) return res.status(400).json({ message: "User not found" })
        
        const matchPassword = await User.comparePassword(req.body.password, userFound.password) //valida password

        if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'})

        const role = await Role.findOne({ _id: userFound.idrole })
        
        const Tasks = await Task.find({ _id: { $in: role.idtasks } }, { name: 1 })
        
        const tasksNames = Tasks.map((task) => task.name)

        console.log(userFound); 
        
        const token = jwt.sign({ id: userFound._id, role: role.name, tasks: tasksNames }, config.key, {
            expiresIn: 86400
        })

        console.log(userFound);

        res.json({ token: token, })

        // res.json('signin')       
    } catch (error) {
        console.log(error);
    }
}