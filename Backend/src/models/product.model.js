import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        productName: { 
            type: String,
            required: true 
        },
        productPrice: { 
            type: Number, 
            required: true 
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
