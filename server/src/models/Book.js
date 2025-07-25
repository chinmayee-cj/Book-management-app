import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    author:      { type: String, required: true },
    description: { type: String },
    coverUrl:    { type: String },      // Cloudinary URL
    publicId:    { type: String }       // For delete/edit
  },
  { timestamps: true }
);

export default mongoose.model('Book', BookSchema);
