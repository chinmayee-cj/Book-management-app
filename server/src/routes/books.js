import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import Book from '../models/Book.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

// CREATE ----------------------------------------------------------
router.post('/', upload.single('cover'), async (req, res, next) => {
  try {
    const { title, author, description } = req.body;
    const { path: coverUrl, filename: publicId } = req.file || {};
    const book = await Book.create({ title, author, description, coverUrl, publicId });
    res.status(201).json(book);
  } catch (err) { next(err); }
});

// UPDATE ----------------------------------------------------------
router.put('/:id', upload.single('cover'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) {
      // delete old image if any
      const old = await Book.findById(id);
      if (old?.publicId) await cloudinary.uploader.destroy(old.publicId);
      updates.coverUrl = req.file.path;
      updates.publicId = req.file.filename;
    }
    const book = await Book.findByIdAndUpdate(id, updates, { new: true });
    res.json(book);
  } catch (err) { next(err); }
});

// READ ------------------------------------------------------------
router.get('/', async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// DELETE ----------------------------------------------------------
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (book?.publicId) await cloudinary.uploader.destroy(book.publicId);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
