import Role from '../models/Role'
import User from '../models/User';
import bcrypt from 'bcryptjs'
import Task from '../models/Task';

export const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount();
        const tasks = await Task.find({ name: { $in: ['home', 'about', 'product', 'contact'] } });

        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: "user" }).save(),
            new Role({ name: "admin" }).save(),
            new Role({ name: "superadmin", idtasks: tasks.map((task) => task._id )}).save(),
        ])

        console.log(values);

    } catch (error) {
        console.error(error)
    }
}

export const createSuperAdmin = async () => {
    
    const user = await User.findOne({ email: "superadmin@localhost" });

    const roles = await Role.findOne({ name: "superadmin" });
    
    // console.log(roles);

    if (!user) {
        await User.create({
            username: "superadmin",
            email: "superadmin@localhost",
            password: await bcrypt.hash("superadmin", 10),
            idrole: roles._id,
        }); 
        console.log('Superadmin user created');
    }


}

export const createTasks = async () => {
   
    try {
        const count = await Task.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Task({ name: "home", description: "Give permission to home" }).save(),
            new Task({ name: "about", description: "Give permission to about" }).save(),
            new Task({ name: "product", description: "Give permission to product" }).save(),
            new Task({ name: "contact", description: "Give permission to contact" }).save(),
        ])

        console.log(values);
    } catch (e) {
        console.log(e);
    }

}

