import { Schema, model } from "mongoose";

const vetSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Vet', vetSchema);