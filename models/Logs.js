import mongoose from "mongoose";
const { Schema } = mongoose;

const ActivityLogSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String, // e.g., "login", "task_updated", "file_uploaded"
      required: true,
    },
    details: {
      type: String, // optional extra info
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", ActivityLogSchema);
