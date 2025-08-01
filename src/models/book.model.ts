import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price : {
    type: String,
    required: true,
  },
  likes : {
    type : Number,
    default : 0
  },
});

const Book = mongoose.model('BOOK', bookSchema);

export default Book;