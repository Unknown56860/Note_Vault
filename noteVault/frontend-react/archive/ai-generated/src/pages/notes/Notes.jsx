import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getNotes } from "../../apiService/notes.js";
import { showToast } from "../../components/Toast.jsx";

import states from "../../utils/states.js";

function Notes() {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const userEmail = states((state) => state.email);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);

            const res = await getNotes();

            if (!res.data.success) {
                showToast("Unable to fetch notes.", false);
                return;
            }

            const sortedNotes = [...res.data.notes].sort(
                (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
            );

            setNotes(sortedNotes);
        } catch {
            showToast("Failed to load notes.", false);
        } finally {
            setLoading(false);

            if (!userEmail) {
                navigate("/login");
            }
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

                    <h4>Loading your library...</h4>

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

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-5">

                    <div>

                        <h1
                            className="fw-bold mb-2"
                            style={{ color: "#2C3E50" }}
                        >
                            My Notes
                        </h1>

                        <p className="text-secondary mb-0">
                            {notes.length}{" "}
                            {notes.length === 1 ? "note" : "notes"} stored in
                            your personal library.
                        </p>

                    </div>

                    <Link
                        to="/notes/new"
                        className="btn btn-success rounded-pill px-4 mt-3 mt-lg-0"
                    >
                        + New Note
                    </Link>

                </div>

                {notes.length === 0 ? (

                    <div className="card border-0 shadow">

                        <div className="card-body text-center py-5">

                            <img
                                src=""
                                alt="Empty notebook"
                                className="mb-4"
                                style={{
                                    width: "140px",
                                    height: "140px",
                                    objectFit: "contain"
                                }}
                            />

                            <h3>No notes yet</h3>

                            <p className="text-secondary mb-4">
                                Your bookshelf is empty. Start by creating your
                                first note.
                            </p>

                            <Link
                                to="/notes/new"
                                className="btn btn-success rounded-pill px-4"
                            >
                                Create First Note
                            </Link>

                        </div>

                    </div>

                ) : (

                    <div className="row g-4">

                        {notes.map((note) => (

                            <div
                                className="col-md-6 col-xl-4"
                                key={note._id}
                            >

                                <Link
                                    to={`/notes/${note._id}`}
                                    className="text-decoration-none"
                                >

                                    <div className="card h-100 border-0 shadow-sm">

                                        <div
                                            className="card-header border-0 text-white"
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
                                                        width: "24px",
                                                        height: "24px",
                                                        objectFit: "contain"
                                                    }}
                                                />

                                                <strong
                                                    className="text-truncate"
                                                >
                                                    {note.title || "Untitled"}
                                                </strong>

                                            </div>

                                        </div>

                                        <div className="card-body">

                                            <p
                                                className="text-secondary"
                                                style={{
                                                    minHeight: "72px"
                                                }}
                                            >
                                                {note.content
                                                    ? note.content.length > 120
                                                        ? `${note.content.substring(
                                                              0,
                                                              120
                                                          )}...`
                                                        : note.content
                                                    : "No content available."}
                                            </p>

                                        </div>

                                        <div className="card-footer bg-white">

                                            <small className="text-secondary d-block">
                                                Created
                                            </small>

                                            <small>
                                                {new Date(
                                                    note.createdAt
                                                ).toLocaleString()}
                                            </small>

                                            <hr />

                                            <small className="text-secondary d-block">
                                                Last Updated
                                            </small>

                                            <small>
                                                {new Date(
                                                    note.updatedAt
                                                ).toLocaleString()}
                                            </small>

                                        </div>

                                    </div>

                                </Link>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </main>
    );
}

export default Notes;
