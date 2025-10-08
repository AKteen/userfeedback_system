import mongoose from 'mongoose';

const template = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    feilds: [
        {
            label: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
                enum: ["Text", "Textarea", "Options", "Radio", "Number", "Email"]
            },
            options: {
                type: [String],
                required: false,
            },


        }
    ],

    role: {
        type: String,
        required: true,
        enum: ["Admin", "User", "Both"],
    }
});

const Form = mongoose.model("Form", template);

export default Form;