import express from 'express';
import Form from '../models/templateModel.js';
import mongoose from 'mongoose';

const router = express.Router();


router.post('/', async(req, res)=>{
    console.log("template post hit");
    try{
        const {title, description, feilds, role}= req.body;
        if(req.body){
           
            await Form.deleteMany({});
            
            const newTemplate = new Form({
                title,
                description,
                feilds,
                role
            });
            await newTemplate.save();
            res.status(200).json({message: "template submitted successfully"});
            console.log("template submitted successfully");
        }

    }catch(error){
        res.status(400).json({message: "failed to submit template"});
        console.log("template post router failed");
    }
});


router.get('/', async(req, res)=>{
    console.log("template get hit");

    try{
        const templates = await Form.find();
        if(templates){
            res.status(200).json({templates});
            console.log("template fetched successfully");
        }
        else{
            res.status(404).json({message: "no templates found"});
        }

    }catch(error){
        res.status(500).json({message: "fetching template failed"});
        console.log("template fetching failed");
    }
});

router.delete('/', async(req, res) => {
    console.log("template delete hit");
    try {
        const result = await Form.deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).json({message: "template deleted successfully"});
            console.log("template deleted successfully");
        } else {
            res.status(404).json({message: "no template found to delete"});
        }
    } catch (error) {
        res.status(500).json({message: "failed to delete template"});
        console.log("template deletion failed");
    }
});

export default router;