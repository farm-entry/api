import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface UserSettingsDocument extends Document {
  subdomain: string;
  username: string;
  menuOptions: {
    [key: string]: string | boolean | number | null | undefined;
  }
}
const UserSettingsSchema = new Schema({
  subdomain: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  menuOptions: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
});

//UserSettingsSchema.index({ subdomain: 1, username: 1 }, { unique: true });

const UserSettingsModel = model<UserSettingsDocument>(
  "UserSettings",
  UserSettingsSchema
);
export default UserSettingsModel;
