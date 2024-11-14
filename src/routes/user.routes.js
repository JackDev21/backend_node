import express from "express"
import User from "../models/user.model.js"

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    console.log("GET ALL", users)

    if (users.length === 0) {
      return res.status(204).json({ message: "No users found" })
    }

    res.json(users)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/register", async (req, res) => {
  const { name, surname, email, password } = req?.body

  if (!name || !surname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const user = new User({
    name,
    surname,
    email,
    password,
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.json({ token })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


export default router