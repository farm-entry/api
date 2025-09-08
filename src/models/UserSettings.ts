import mongoose, { Document } from "mongoose";
const { Schema, model } = mongoose;

export interface UserSettingsDocument extends Document {
  subdomain: string;
  username: string;
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
});

//UserSettingsSchema.index({ subdomain: 1, username: 1 }, { unique: true });

const UserSettingsModel = model<UserSettingsDocument>(
  "UserSettings",
  UserSettingsSchema
);
export default UserSettingsModel;
