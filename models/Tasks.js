import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  description: { type: String },

  // Task status
  status: {
    type: String,
    enum: ["assigned", "treated", "done", "refused"], // task lifecycle
    default: "assigned"
  },

  // Task priority
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"], // actual priority values
    default: "medium"
  },

  // Task due date
  dueDate: {
    type: Date,
    required: false // make required if every task must have a deadline
  },

  refuseReason: { type: String }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
