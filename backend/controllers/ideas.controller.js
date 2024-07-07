import Idea from '../models/Ideas.model.js'

async function createIdea(req,resp){
    try{
        const newIdea = await Idea.create(req.body);
        return resp.status(201).json(newIdea);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function getIdea(req,resp){
    try{
        const aIdea = await Idea.findById(req.params.id);
        return resp.status(200).json(aIdea);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function getAllIdeas(req,resp){
    try{
        const allIdea = await Idea.find();
        return resp.status(200).json(allIdea);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function updateIdea(req,resp){
    const options = {
        new: true,
        runValidators: true,
    };
    try{
        const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, req.body,options);
        resp.status(200).json(updatedIdea);
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

async function deleteIdea(req,resp){
    try{
        const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
        return resp.status(204).send();
    }catch(error){
        console.log(error);
        resp.status(400).json(error);
    }
};

export{
    createIdea,
    getIdea,
    getAllIdeas,
    updateIdea,
    deleteIdea,
};