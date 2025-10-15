import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface FarmConfigDocument extends Document {
  subdomain: string;
  url: string;
  user: string;
  accessKey: string;
  menuOptions: {
    [key: string]: string | boolean | number | null | undefined;
  }
}

const FarmConfigSchema = new Schema(
  {
    subdomain: {
      type: String,
      required: true,
      unique: true
    },
    url: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    accessKey: {
      type: String,
      required: true
    },
    menuOptions: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

const FarmConfigModel = model<FarmConfigDocument>(
  "FarmConfig",
  FarmConfigSchema
);
export default FarmConfigModel;
