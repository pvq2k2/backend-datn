import mongoose, { Schema, ObjectId } from "mongoose";
const CateProductSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("CategoryProduct", CateProductSchema);
