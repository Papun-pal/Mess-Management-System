import mongoose, { Schema } from "mongoose";

const GasBillSchema = new Schema({
  month: {
    type: String,
    required: true,
  }, // Example: "January", "February"
  year: {
    type: Number,
    required: true,
  },
  totalbill: {
    type: Number,
    required: true
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      amount: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
      },
    },
  ],
},
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("GasBill", GasBillSchema);