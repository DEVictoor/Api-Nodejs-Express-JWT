import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    idtasks: [{
        ref: "Task",
        type: Schema.Types.ObjectId
    }]
}, {
    versionKey: false
})

export default model('Role', roleSchema);