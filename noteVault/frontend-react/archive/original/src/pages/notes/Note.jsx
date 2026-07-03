import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {getNote, newNote, updateNote, deleteNote } from "../../apiService/notes.js";
import { showToast } from "../../components/Toast.jsx";

function Note() {
    const { id } = useParams();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [editing, setEditing] = useState(isNew);
    
    const [note, setNote] = useState({title: "", content: ""});

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isNew) {
            fetchNote();
        }
    }, [id]);

    const fetchNote = async () => {
        setLoading(true);

        try {
            const res = await getNote(id);

            if (res.data.message) {
                showToast(res.data.message, res.data.success);
            }

            if (!res.data.success) {
                navigate("/notes");
                return;
            }

            const data = res.data.notes;

            setNote({
                title: data.title,
                content: data.content,
            });
        } catch {
            showToast("Failed to load note.", false);
            navigate("/notes");
        }

        setLoading(false);
    };

    const handleChange = (e) => {
        setNote((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            let res;

            if (isNew) {
                res = await newNote(note);
            } else {
                res = await updateNote(id, note);
            }

            if (res.data.message) {
                showToast(res.data.message, res.data.success);
            }

            if (res.data.success) {
                if (isNew) {
                    navigate("/notes");
                } else {
                    setEditing(false);
                    fetchNote();
                }
            }
        } catch {
            showToast("Failed to save note.", false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this note?")) return;

        try {
            const res = await deleteNote(id);

            if (res.data.message) {
                showToast(res.data.message, res.data.success);
            }

            if (res.data.success) {
                navigate("/notes");
            }
        } catch {
            showToast("Failed to delete note.", false);
        }
    };

    if (loading) {
        return (
            <main>
                <h5>Loading note...</h5>
            </main>
        );
    }

    return (
        <main>
            <h1>{isNew ? "Create New Note" : editing ? "Edit Note" : "Note"}</h1>
            {editing ? (
                <form onSubmit={handleSave}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Enter a title"
                        value={note.title} onChange={handleChange}/>
                    <br />

                    <label>Content</label>
                    <textarea name="content" rows={15} placeholder="Write your note here..." 
                        value={note.content} onChange={handleChange}/>
                    <br />  

                    <button type="submit">{isNew ? "Create Note" : "Save Note"}</button>
                    {!isNew && (
                        <button type="button" onClick={() => {setEditing(false); fetchNote();}}>
                            Cancel
                        </button>
                    )}
                </form>
            ) : (
                <div>
                    <h2>{note.title || "Untitled"}</h2>
                    <div>{note.content || "This note has no content."}</div>
                    <div>
                        <button onClick={() => setEditing(true)}>Edit Note</button>
                        <button onClick={handleDelete}>Delete Note</button>
                    </div>
                </div>
            )}

        </main>
    );
}

export default Note;
