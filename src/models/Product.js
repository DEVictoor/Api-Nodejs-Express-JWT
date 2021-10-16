import { Schema, model } from "mongoose";

//modelo o estructura para cada documento

const productSchema = new Schema({
    type: { type: String, default: 'product'},
    attributes: {
        name: String,
    category: String,
    price: Number,
    imgURL: String,
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Product', productSchema); 