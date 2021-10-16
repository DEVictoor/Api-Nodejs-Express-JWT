import Role from "../models/Role"

export const checkRolesExisted = async (req, res, next) => {
    
    const role = req.body.role

    if (role) {
        if (typeof role === 'string' || role instanceof String) {
            //it is string
            const roles = await Role.find({}, { name: 1 });
            
            if (!roles.includes(req.body.role)) {
                return res.status(400).json({
                    message: `Role ${req.body.role} does not exits`
                })
            }   
            next();
        } else {
            //it is not string
            return res.status(400).json({
                message: `Only one String data type error is allowed`
            })
        }
    } else {
        return res.status(400).json({
            message: `Not found role`
        })
    }
}