import note from "../models/note.js";

export const createNote = async (data) => {
    const newNote = new note(data);
    return await newNote.save();
}

export const getNote = async (id) => {
    return await note.findById(id);
}

export const updateNote = async (id, data) => {
    return await note.findByIdAndUpdate(
        id, data, {returnDocument: 'after', runValidators: true}
    );
}

export const deleteNote = async (id) => {
    return await note.findByIdAndDelete(id);
}

export const getNotesByUser = async (user_id) => {
    return await note.find({user_id: user_id});
}

export const deleteNotesByUser = async (user_id) => {
    return await note.deleteMany({user_id: user_id});
}
