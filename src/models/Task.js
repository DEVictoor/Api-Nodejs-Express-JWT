import { Schema, model } from "mongoose";

//modelo o estructura para cada documento

const taskSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Task', taskSchema); 