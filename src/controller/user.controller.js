import Role from "../models/Role";
import User from "../models/User";

export const createUser = async (req, res) => {

    try {
        const { username, email, password, roles } = req.body;

        const rolesFound = await Role.find({ name: { $in: roles } });

        const user = new User({
            username,
            email,
            password,
            roles: rolesFound.map((role) => role._id),
        })

        user.password = await User.encryptPassword(user.password);
        
        const savedUser = await user.save();
        console.log(rolesFound);

        return res.status(200).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            roles: savedUser.roles,
        })

    } catch (error) {
        console.log(error);
    }

    // res.json('creating user');
}

export const getUsers = async (req, res) => {

    try {
        const users = await User.find().populate("idVet").populate("idRole");

        res.status(200).json({ data: users });
    }
    catch (e) {
        console.log(e);
    }
    
}

export const getUsersByPage = async (req, res) => {
    
    try {

    }
    catch (e) {
        return res.status(500).json({title: "DB error ", error: e})
    }
}

export const getUserById = async (req, res) => {
    
    try {
        const userbyId = await User.findById(req.params.id)
        
        res.status(200).json({data: userbyId})
    } catch (error) {
        
    }
}

export const updateUserById = async (req, res) => {
    
    try {
        
    } catch (e) {
        return res.status(500).json({title: "DB error ", error: e})
    }
}

export const deleteUserById = async (req, res) => {

    try {
        
    } catch (e) {
        return res.status(500).json({title: "DB erorr", error: e})
    }

}