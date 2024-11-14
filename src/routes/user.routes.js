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

    res.json(books)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", async (req, res) => {
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




export default router