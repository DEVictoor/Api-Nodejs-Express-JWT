import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role"

export const verifyToken = async (req, res, next) => {

  try {

    //Se implemento el bearer, con el slice se recorre el "Bearear
    const token = req.headers["authorization"].slice(7); 

    // console.log(token)

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, config.key);

    req.userid = decoded.id;

    const user = await User.findById(req.userid, { password: 0 });

    if (!user) return res.status(404).json({ message: "no user found" });

    // console.log(user);

    next();
  } catch (error) {
    return res.status(401).json({meesage: "Token invalid"})
  }
};

export const isModerator = async (req, res, next) => {
  
  const user = await User.findById(req.userid)
  const role = await Role.findOne({ _id: user.role })

    if (role.name === "moderator") {
      next();
      return;
    }

  return res.status(403).json({ message: "Require Moderator role " }); 
}

export const isAdmin = async (req, res, next) => {
  try {

    const user = await User.findById(req.userid)
    const role = await Role.findOne({_id: user.roles})
  
      if (role.name === "admin") {
        next();
        return;
      }
  
    return res.status(403).json({ message: "Require admin role " });

  } catch (error) {
    return res.status(500).json({message: "Error server"})
  }
}

export const isSuperAdmin = async (req, res, next) => {

  try {

    const user = await User.findById(req.userid)
    const roleName = await Role.findOne({_id: user.idrole })

    if (roleName.name === "superadmin") {
      next();
      return;
    }

    return res.status(403).json({ message: "Require superadmin role " }); 

  } catch (error) {
    return res.status(500).json({message: "Error server"})
  }  
}
