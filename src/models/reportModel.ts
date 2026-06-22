import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    programId: {
      type: Number,
      required: true,
    },

    programName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    proofFile: {
      type: String,
    },

    researcherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);