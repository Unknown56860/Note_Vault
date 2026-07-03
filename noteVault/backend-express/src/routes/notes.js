import express from "express";

import AuthHandler from "../middleware/jwtAuthHandler.js";

import * as notesService from "../service/notes.js";

const notesRouter = express.Router();

notesRouter.post("/", AuthHandler, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title || "";
    const content = req.body.content || "";

    const newNote = await notesService.createNote(userId, title, content);

    if(!newNote) {
        return res.status(500).json({success: false, message: "Failed to save note"});
    }
    return res.status(201).json({success: true, message: "Note saved successfully", note: newNote});
});

notesRouter.get("/", AuthHandler, async (req, res) => {
    const userId = req.userId;
    const notes = await notesService.getAllNotes(userId);
    return res.status(200).json({success: true, notes: notes});
});

notesRouter.get("/:id", AuthHandler, async (req, res) => {
    const userId = req.userId;
    const noteId = req.params.id;

    const note = await notesService.getNote(userId, noteId);

    if(!note) {
        return res.status(404).json({success: false, message: "Note not found"});
    }
    return res.status(200).json({success: true, note: note});
});

notesRouter.put("/:id", AuthHandler, async (req, res) => {
    const userId = req.userId;
    const noteId = req.params.id;
    const title = req.body.title || "";
    const content = req.body.content || "";
    
    const note = await notesService.updateNote(userId, noteId, title, content);

    if(!note) {
        return res.status(403).json({success: false, message: "Failed to update note"});
    }
    return res.status(200).json({success: true, message: "Note updated successfully", note: note});
});

notesRouter.delete("/:id", AuthHandler, async (req, res) => {
    const userId = req.userId;
    const noteId = req.params.id;

    const deletedNote = await notesService.deleteNote(userId, noteId);

    if(!deletedNote) {
        return res.status(403).json({success: false, message: "Failed to delete note"});
    }
    return res.status(200).json({success: true, message: "Note deleted successfully"});
});

export default notesRouter;
