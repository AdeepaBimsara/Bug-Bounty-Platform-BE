import { Schema, model, Document, Types } from "mongoose";

export interface IProgram extends Document {
  title: string;
  description: string;
  scope: string;
  visibility: string;

  rewardMin: number;
  rewardMax: number;

  companyId: Types.ObjectId;

  type: string;

  status: string;
}

const programSchema = new Schema<IProgram>(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      default: "WEB",
    },

    description: {
      type: String,
      required: true,
    },

    scope: {
      type: String,
      required: true,
    },

    visibility: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },

    rewardMin: {
      type: Number,
      required: true,
    },

    rewardMax: {
      type: Number,
      required: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "DRAFT", "ARCHIVED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export const ProgramModel = model<IProgram>("program", programSchema);
