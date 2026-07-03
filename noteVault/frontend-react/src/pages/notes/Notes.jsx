import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getNotes } from "../../apiService/notes.js";
import { showToast } from "../../components/Toast.jsx";

import states from "../../utils/states.js";

import addIco from "../../assets/add.png";
import noteIco from "../../assets/note.png";

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
            if(!userEmail) {
                navigate("/login");
            }
        }

    };

    if (loading) {
        return (
            <main>
                <h5>Loading notes...</h5>
            </main>
        );
    }

    return (
    <main className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

            <div>
                <h1 className="mb-1">My Notes</h1>
                <p className="text-secondary mb-0">
                    {notes.length} {notes.length === 1 ? "note" : "notes"} in the vault
                </p>
            </div>

            <Link to="/notes/new">
                <button className="btn btn-success">
                    <img
                        src={addIco}
                        alt=""
                        className="me-2"
                        style={{ width: 18, height: 18, objectFit: "contain" }}
                    />
                    New Note
                </button>
            </Link>

        </div>

        {notes.length === 0 ? (

            <div className="card shadow-sm text-center py-5">
                <div className="card-body">

                    <img
                        src={addIco}
                        alt=""
                        className="mb-3"
                        style={{ width: 90, height: 90, objectFit: "contain" }}
                    />

                    <h4>Your vault is empty</h4>

                    <p className="text-secondary">
                        Create your first note and start building your collection.
                    </p>

                    <Link to="/notes/new">
                        <button className="btn btn-success">
                            Create Note
                        </button>
                    </Link>

                </div>
            </div>

        ) : (

            <div className="row g-4">

                {notes.map((note) => (
                    <div className="col-md-6 col-lg-4" key={note._id}>

                        <Link
                            to={`/notes/${note._id}`}
                            className="text-decoration-none text-dark"
                        >
                            <div className="card h-100 shadow-sm">

                                <div className="card-body">

                                    <img
                                        src={noteIco}
                                        alt=""
                                        className="mb-3"
                                        style={{ width: 36, height: 36, objectFit: "contain" }}
                                    />

                                    <h5 className="text-truncate">
                                        {note.title || "Untitled"}
                                    </h5>

                                    <p className="text-secondary small mb-0">
                                        Created: {new Date(note.createdAt).toLocaleString()}
                                    </p>

                                    <p className="text-secondary small mb-0">
                                        Updated: {new Date(note.updatedAt).toLocaleString()}
                                    </p>

                                </div>

                            </div>
                        </Link>

                    </div>
                ))}

            </div>

        )}

    </main>
);
}

export default Notes;
