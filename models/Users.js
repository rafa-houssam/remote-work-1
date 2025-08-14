import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
        role: { type: String, enum: ["employee", "admin"], default: "employee" },
        phoneNumber: { type: String, default: "" },
        position: { type: String, default: "" },
        geoPosition: {
            type: String,
            default: null
        },
        dateOfJoining: { type: Date, default: Date.now },
        bio: { type: String, default: "" }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
