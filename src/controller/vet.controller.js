import Role from "../models/Role";
import User from "../models/User";
import Vet from "../models/Vet";
import { Builder } from "../libs/Builder";

export const createVet = async (req, res) => {

    try {

        const { name, username, email, password } = req.body;

        const rolesFound = await Role.findOne({ name: "admin" });
        
        const vet = new Vet({ name, });

        console.log(req.body);
        
        const savedVet = await vet.save();

        const user = new User({
            username,
            email,
            password,
            idrole: rolesFound._id,
        })

        user.password = await User.encryptPassword(user.password);
        user.idVet = savedVet._id;
        user.idJefe = req.userid;

        const savedUser = await user.save();

        return res.status(200).json({
            vet: {savedVet},
            user: {savedUser}
        })

    } catch (e) {
        res.status(400).json({ messsage: "server error" , error: e});
        console.log(e)
    }

}


export const getVets = async (req, res) => {
    
    try {

        const _URL = new URL(req.connection.encrypted ? 'https' : 'http' + '://' + req.headers.host + req.url)
        const URLAPI = _URL.origin + '/api/vets/'
        const totalRegistros = await Vet.find().count();
        const templatePage = { 'num': 1, 'size': totalRegistros, 'total': totalRegistros }

        const page = (!req.query.page) ? templatePage : { ...templatePage, ...{ ...req.query.page } };
        
        const ini = (page.num - 1) * page.size;
        // const data = await User.find().populate("idVet")
        const data = await Vet.find().skip(ini).limit(page.size);

        const body = { 'data': data, 'type': 'Vet', 'page': templatePage, 'URL': URLAPI }
        const dataFormated = Builder(body);

        res.status(200).json(dataFormated)
            
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }    
}

export const getVetsAll = async (req, res) => {
    try {
        
        const roleAdmin = await Role.findOne({ name: "admin" }, { _id: 1 }); 
        const vets = await Vet.find({}, { _id: 1 });
        
        const output = await User.find({ idrole: roleAdmin, idVet: vets }, {idrole: 1, idVet: 0, idJefe:0}).populate("idVet").populate("idrole").populate("idJefe")

        res.status(200).json(output);
    } catch (error) {
        res.status(500).json({log: error})
    }
}

export const getVetById = async (req, res) => {
  
    try {

        const data = await Vet.findById(req.params.id);

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const updateVetById = async(req, res) => {
  
    try {

        const { vet_name, user_name, user_email } = req.body;
        
        const vet = await Vet.findById(req.params.id);

        const updateAdmin = await User.findByIdAndUpdate(
            vet.owner,
            {
                username: user_name,
                email: user_email,
            },
            {
                new:true
            }
        )
        
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const deleteVetById = async (req, res) => {
    
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(204).json();
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
}