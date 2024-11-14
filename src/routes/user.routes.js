import express from "express"
import User from "../models/user.model.js"

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
    console.log("GET ALL", books)

    if (books.length === 0) {
      return res.status(204).json({ message: "No books found" })
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


router.get("/:id", getBook, async (req, res) => {
  res.json(res.book)
})



router.put("/:id", getBook, async (req, res) => {
  try {
    const book = res.book // book se obtiene del middleware getBook

    book.title = req.body.title || book.title
    book.author = req.body.author || book.author
    book.genre = req.body.genre || book.genre
    book.publication_date = req.body.publication_date || book.publication_date

    const updatedBook = await book.save()
    res.json(updatedBook)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// patch es para actualizar solo algunos campos
router.patch("/:id", getBook, async (req, res) => {

  if (!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date) {
    return res.status(400).json({ message: "At least one field is required" })
  }


  try {
    const book = res.book // book se obtiene del middleware getBook

    book.title = req.body.title || book.title
    book.author = req.body.author || book.author
    book.genre = req.body.genre || book.genre
    book.publication_date = req.body.publication_date || book.publication_date

    const updatedBook = await book.save()
    res.json(updatedBook)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Eliminar un libro

router.delete("/:id", getBook, async (req, res) => {

  try {
    const book = res.book
    await book.deleteOne({ _id: book._id })


    res.json({ message: `${book.title} has been deleted` })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})




export default router