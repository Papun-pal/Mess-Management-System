import mongoose, { Schema } from "mongoose";

const WeeklyFundSchema = new Schema({
  month: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      amount: {
        type: Number,
        default: 0 // ✅ Default amount is 0
      },
      status: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model("WeeklyFund", WeeklyFundSchema);
