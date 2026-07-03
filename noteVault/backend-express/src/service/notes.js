import * as notesRepo from "../database/mongo/controller/notes.js";

export const createNote = async (userId, title, content) => {
    const note = {user_id: userId, title: title, content: content};
    return await notesRepo.createNote(note);
}

export const getNote = async (userId, noteId) => {
    const note = await notesRepo.getNote(noteId);
    return note ? note.user_id == userId ? note : null : null;
}

export const updateNote = async (userId, noteId, title, content) => {
    const note = await notesRepo.getNote(noteId);
    
    if(note.user_id != userId) {
        return null;
    }
    
    const updatedNote = {user_id: userId, title: title, content: content};
    return await notesRepo.updateNote(noteId, updatedNote);
}

export const deleteNote = async (userId, noteId) => {
    const note = await notesRepo.getNote(noteId);
    
    if(note.user_id != userId) {
        return null;
    }

    return await notesRepo.deleteNote(noteId); 
}

export const getAllNotes = async (userId) => {
    return await notesRepo.getNotesByUser(userId);
}

export const deleteAllNotes = async (userid) => {
    return await notesRepo.deleteNotesByUser(userid);
}
