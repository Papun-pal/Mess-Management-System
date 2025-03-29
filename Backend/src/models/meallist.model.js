import mongoose, { Schema } from "mongoose";

const MealListSchema = new Schema(
    {

        day: {
            type: String,
            enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],

        },
        mealType: {
            type: String,
            enum: ["breakfast", "lunch", "dinner"],
            required: true
        },
        mealName: {
            type: String,
            required: true
        }

    },
    { timestamps: true }
);

export default mongoose.model("MealList", MealListSchema);






// import mongoose, { Schema } from "mongoose";

// const MealListSchema = new Schema(
//     {
//         meals: [
//             {
//                 day: { 
//                     type: String, 
//                     enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], 
                    
//                 },
//                 mealType: { 
//                     type: String, 
//                     enum: ["breakfast", "lunch", "dinner"], 
//                     required: true 
//                 },
//                 mealName: { 
//                     type: String, 
//                     required: true 
//                 }
//             }
//         ]
//     },
//     { timestamps: true }
// );

// export default mongoose.model("MealList", MealListSchema);
