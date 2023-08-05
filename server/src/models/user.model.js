import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  career: {
    type: "string",
    required: false,
    trim: true,
  },
},{
  timestamps: true,
})

// Esto es para interactuar con la base de datos y sus metodos
export default mongoose.model('User', userSchema);