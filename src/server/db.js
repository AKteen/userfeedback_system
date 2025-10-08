import mongoose from 'mongoose';

const connectDB = () => {
    try{
        const conn = mongoose.connect("mongodb://localhost:27017/testing");
        console.log("MongoDB connected!");


    }catch(error){
        console.log("failed to connect mongoDB");
        
    }
}


export default connectDB;