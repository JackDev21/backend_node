import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    password: String,
  }
)

const User = mongoose.model("User", userSchema)
export default User