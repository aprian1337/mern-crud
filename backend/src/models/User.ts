import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  loginTimestamps: Date[];
  logoutTimestamps: Date[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  loginTimestamps: { type: [Date], default: [] },
  logoutTimestamps: { type: [Date], default: [] },
});

export default mongoose.model<IUser>("users", UserSchema);
