// import Role from "../models/Role";
// import User from "../models/User";
// import Vet from "../models/Vet";
import Task from "../models/Task"

export const createTask = async (req, res) => {

    try {
        const { name, descripcion  } = req.body;

        const task = new Task({
            name,
            descripcion
        })
        
        const savedTask = await task.save();

        return res.status(200).json({
            id: savedTask._id,
            name: savedTask.name,
            description: savedTask.description
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "server error" });
    }

    // res.json('creating user');
}

export const getTasks = async (req, res) => {
    
    let myUrl = new URL(req.connection.encrypted ? 'https' : 'http' + '://' + req.headers.host + req.url);

    const tasks  = await Task.find();
    // const products = await Product.find({},{"_id": 0});
  
    // console.log(myUrl.href);
  
    res.status(200).json({data: tasks});
}

export const getTaskByPage = async (req, res) => {
    
    try {
    
        const page = parseInt(req.params.page);
        const size = parseInt(req.params.size);
      
        if (page === 0 || size === 0) {
          return res.statis(401).json({ "messagge": "No se admite valores igual a cero" });
        }
      
        //Numero total de registros
        const total = await Task.find().count(); 
        
        const ini = (page - 1) * size;
      
        const vets = await Vet.find().skip(ini).limit(size);
      
        res.json({ data: vets });
        
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }    
}

export const getTaskById = async (req, res) => {
  
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const updateTaskById = async(req, res) => {
  
    try {

        // const { name, description } = req.body;
        
        // const task = await Task.findById(req.params.id);

        const updateTask = await Task.findByIdAndUpdate(
            req.params.productId,
            req.body,
            {
                new:true
            }
        )
        
        res.status(200).json(updateTask);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const deleteTaskById = async (req, res) => {
    
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).json();
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
}