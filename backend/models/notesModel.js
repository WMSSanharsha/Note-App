import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const NotesSchema = mongoose.model("Notes", notesSchema);

export default NotesSchema;
