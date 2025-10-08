import express from 'express';
import Response from '../models/responseModel.js';

const router = express.Router();

// POST - Create new response
router.post('/', async(req, res) => {
    console.log("response post hit");
    try {
        const responseData = req.body;
        if(responseData) {
            const newResponse = new Response(responseData);
            await newResponse.save();
            res.status(200).json({message: "response submitted successfully"});
            console.log("response submitted successfully");
        }
    } catch(error) {
        res.status(400).json({message: "failed to submit response"});
        console.log("response post failed");
    }
});


router.get('/', async(req, res) => {
    console.log("response get hit");
    try {
        const responses = await Response.find();
        if(responses) {
            res.status(200).json(responses);
            console.log("responses fetched successfully");
        } else {
            res.status(404).json({message: "no responses found"});
        }
    } catch(error) {
        res.status(500).json({message: "fetching responses failed"});
        console.log("response fetching failed");
    }
});

router.delete('/', async(req, res) => {
    console.log("response delete hit");
    try {
        const result = await Response.deleteMany({});
        if (result.deletedCount > 0) {
            res.status(200).json({message: "responses deleted successfully"});
            console.log("responses deleted successfully");
        } else {
            res.status(404).json({message: "no responses found to delete"});
        }
    } catch(error) {
        res.status(500).json({message: "failed to delete responses"});
        console.log("response deletion failed");
    }
});

router.delete('/:index', async(req, res) => {
    console.log("response delete by index hit");
    try {
        const index = parseInt(req.params.index);
        const responses = await Response.find();
        
        if (index >= 0 && index < responses.length) {
            const responseToDelete = responses[index];
            await Response.findByIdAndDelete(responseToDelete._id);
            res.status(200).json({message: "response deleted successfully"});
            console.log("response deleted successfully");
        } else {
            res.status(404).json({message: "response not found"});
        }
    } catch(error) {
        res.status(500).json({message: "failed to delete response"});
        console.log("response deletion failed");
    }
});

export default router;