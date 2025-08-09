import mongoose from "mongoose";
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["assigned", "treated", "done", "refused"],
      default: "assigned",
    },
    refuseReason: {
      type: String,
    },
    attachments: [
      {
        type: String, // file URLs
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
