import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getNote,
    newNote,
    updateNote,
    deleteNote
} from "../../apiService/notes.js";

import { showToast } from "../../components/Toast.jsx";

function Note() {
    const { id } = useParams();
    const isNew = !id;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(!isNew);
    const [editing, setEditing] = useState(isNew);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

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
                content: data.content
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
            [e.target.name]: e.target.value
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
        if (!window.confirm("Delete this note permanently?")) return;

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
            <main
                className="container py-5"
                style={{ minHeight: "80vh" }}
            >
                <div className="text-center">

                    <div
                        className="spinner-border text-success mb-3"
                        role="status"
                    />

                    <h4>Loading note...</h4>

                </div>
            </main>
        );
    }

    return (
        <main
            className="py-5"
            style={{
                backgroundColor: "#E8D5B5",
                minHeight: "100vh"
            }}
        >
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10">

                        <div className="card border-0 shadow">

                            <div
                                className="card-header text-white d-flex justify-content-between align-items-center"
                                style={{
                                    backgroundColor: "#5C4033"
                                }}
                            >
                                <div className="d-flex align-items-center">

                                    <img
                                        src=""
                                        alt="Notebook"
                                        className="me-2"
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <h4 className="mb-0">
                                        {isNew
                                            ? "Create New Note"
                                            : editing
                                            ? "Edit Note"
                                            : "My Note"}
                                    </h4>

                                </div>

                                {!editing && !isNew && (
                                    <button
                                        className="btn btn-light btn-sm rounded-pill"
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit
                                    </button>
                                )}

                            </div>

                            <div className="card-body p-4">

                                {editing ? (

                                    <form onSubmit={handleSave}>

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Title
                                            </label>

                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control form-control-lg"
                                                placeholder="Give your note a title..."
                                                value={note.title}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="mb-4">

                                            <label className="form-label fw-semibold">
                                                Content
                                            </label>

                                            <textarea
                                                name="content"
                                                rows={18}
                                                className="form-control"
                                                style={{ resize: "vertical" }}
                                                placeholder="Write your thoughts here..."
                                                value={note.content}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="d-flex gap-3 flex-wrap">

                                            <button
                                                className="btn btn-success rounded-pill px-4"
                                                type="submit"
                                            >
                                                {isNew
                                                    ? "Create Note"
                                                    : "Save Changes"}
                                            </button>

                                            {!isNew && (

                                                <button
                                                    className="btn btn-outline-secondary rounded-pill px-4"
                                                    type="button"
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
                                        <h2
                                            className="fw-bold mb-4"
                                            style={{
                                                color: "#2C3E50"
                                            }}
                                        >
                                            {note.title || "Untitled"}
                                        </h2>

                                        <div
                                            className="border rounded p-4"
                                            style={{
                                                minHeight: "420px",
                                                backgroundColor: "#F8F9FA",
                                                whiteSpace: "pre-wrap",
                                                lineHeight: "1.8"
                                            }}
                                        >
                                            {note.content ||
                                                "This note has no content."}
                                        </div>

                                        <div className="d-flex gap-3 flex-wrap mt-4">

                                            <button
                                                className="btn btn-success rounded-pill px-4"
                                                onClick={() =>
                                                    setEditing(true)
                                                }
                                            >
                                                Edit Note
                                            </button>

                                            <button
                                                className="btn btn-outline-danger rounded-pill px-4"
                                                onClick={handleDelete}
                                            >
                                                Delete Note
                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default Note;
