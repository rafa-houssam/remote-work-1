import mongoose from "mongoose";
const { Schema } = mongoose;

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
