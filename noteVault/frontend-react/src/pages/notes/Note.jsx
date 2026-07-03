import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {getNote, newNote, updateNote, deleteNote } from "../../apiService/notes.js";
import { showToast } from "../../components/Toast.jsx";

import noteIco from "../../assets/note.png";

function Note() {
    const { id } = useParams();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [editing, setEditing] = useState(isNew);
    
    const [note, setNote] = useState(null);

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
            <main className="container py-5">
                <h2 className="mb-1">Loading note...</h2>
            </main>
        );
    }

    return (
        <main className="container py-5">

            <div className="row justify-content-center">
                <div className="col-lg-9">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <div className="d-flex align-items-center mb-4">
                                <img
                                    src={noteIco}
                                    alt=""
                                    className="me-3"
                                    style={{ width: 42, height: 42, objectFit: "contain" }}
                                />
                                <div>
                                    <h2 className="mb-1">
                                        {isNew ? "Create Note" : editing ? "Edit Note" : "Note"}
                                    </h2>
                                    {!isNew && !editing && (
                                        <small className="text-secondary">
                                            Last updated: {new Date(note.updatedAt).toLocaleString()}
                                        </small>
                                    )}
                                </div>
                            </div>

                            {editing ? (

                                <form onSubmit={handleSave}>

                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            placeholder="Enter a title..."
                                            value={note.title}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Content</label>
                                        <textarea
                                            name="content"
                                            rows={15}
                                            className="form-control"
                                            placeholder="Write your thoughts..."
                                            value={note.content}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-success">
                                            {isNew ? "Create Note" : "Save Changes"}
                                        </button>

                                        {!isNew && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => {
                                                    setEditing(false);
                                                    fetchNote();
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>

                                </form>

                            ) : (

                                <>
                                    <h3>{note.title || "Untitled"}</h3>

                                    <hr />

                                    <div
                                        className="mb-4"
                                        style={{ whiteSpace: "pre-wrap", minHeight: 250 }}
                                    >
                                        {note.content || (
                                            <span className="text-secondary">
                                                This note has no content.
                                            </span>
                                        )}
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => setEditing(true)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>

                            )}

                        </div>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default Note;
