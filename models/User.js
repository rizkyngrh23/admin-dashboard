import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  profilePicture: String,
  dob: String,
  gender: String,
  position: String,
  department: String,
  employeeId: String
});

export default model('User', userSchema);