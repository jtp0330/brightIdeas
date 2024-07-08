import User from '../models/users.model.js'
import LoginUser from '../models/loginusers.model.js';

async function createUser(req,resp){
    try{
        const newUser = await User.create(req.body);
        return resp.status(201).json(newUser);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function getUser(req,resp){
    try{
        const aUser = await User.findById(req.params.id);
        return resp.status(200).json(aUser);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function getAllUsers(req,resp){
    try{
        const allUser = await User.find();
        return resp.status(200).json(allUser);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function updateUser(req,resp){
    const options = {
        new: true,
        runValidators: true,
    };
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,options);
        resp.status(200).json(updatedUser);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function deleteUser(req,resp){
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        return resp.status(204).send();
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function loginUser(req,resp)
{
    try{
        const creds = req.body;
        const user = await User.findOne({email:creds.email})
        .then(user=> {
            if(user){
            const hashedPassword = bcrypt.hashSync(creds.password,user.salt);
                    if(hashedPassword === user.password)
                        resp.status(200).json("successful login!")
                    else
                        resp.status(403).json("password is incorrect")
            } else{
                resp.status(404).json("User Not found")
            }
        })
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

export{
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    loginUser,
};