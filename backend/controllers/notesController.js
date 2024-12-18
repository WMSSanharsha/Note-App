import NotesSchema from "../models/notesModel.js";

// get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await NotesSchema.find({});
    if (notes.length === 0) {
      return res.status(404).send("No notes found");
    }
    res.status(200).json({
      count: notes.length,
      data: notes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching notes");
  }
};

// get a single note
const getSingleNote = async (req, res) => {
  try {
    const note = await NotesSchema.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    res.status(200).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching note");
  }
};

// create a note
const createNote = async (req, res) => {
  const note = req.body;
  if (!note.title || !note.content) {
    return res.status(400).send("Title and content are required");
  }
  const newNote = new NotesSchema(note);
  try {
    await newNote.save();
    res.status(201).json({
      message: "Note created successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

// update a note
const updateNote = async (req, res) => {
  const note = req.body;
  if (!note.title || !note.content) {
    return res.status(400).send("Title and content are required");
  }
  try {
    const updatedNote = await NotesSchema.findByIdAndUpdate(
      req.params.id,
      note,
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).send("Note not found");
    }
    res.status(200).json({
      message: "Note updated successfully",
      updated_note: updatedNote,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating note");
  }
};

// delete a note
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await NotesSchema.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).send("Note not found");
    }
    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting note");
  }
};

export { getAllNotes, getSingleNote, createNote, updateNote, deleteNote };
