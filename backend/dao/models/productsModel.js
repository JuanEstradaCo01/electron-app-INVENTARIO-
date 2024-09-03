import mongoose from "mongoose";

const collection = "products"

const productsSchema = mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    quantity: Number,
    price: Number
});

export default mongoose.model(`${collection}`, productsSchema)