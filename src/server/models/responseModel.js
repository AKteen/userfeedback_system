import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    // Dynamic fields - will store form responses as key-value pairs
}, { strict: false, timestamps: true });

const Response = mongoose.model('Response', responseSchema);

export default Response;