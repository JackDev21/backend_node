import express from "express"
import User from "../models/user.model.js"

const router = express.Router()


router.get("/:id", async (req, res) => {

  const { id } = req.params

  try {
    const user = await User.findById(id)


    if (!user) {
      return res.status(204).json({ message: "No users found" })
    }

    res.json(user)

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

    const isMatch = user.password == password
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" })
    }


    res.json({ message: "Logged in" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({ message: "User deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const { name, surname, email, password } = req.body

  try {
    const user = await User.findByIdAndUpdate(id, { name, surname, email, password }, { new: true })

    if (!user) {
      res.status(404).json({ message: "User not found" })
    }


    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


export default router