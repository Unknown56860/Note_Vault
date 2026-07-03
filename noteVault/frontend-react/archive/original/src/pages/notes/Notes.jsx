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
        <main>

            <div>
                <div>
                    <h1>My Notes</h1>
                    <p>
                        {notes.length} {notes.length === 1 ? "note" : "notes"} available
                    </p>
                </div>

                <Link to="/notes/new">
                    <button>New Note</button>
                </Link>
            </div>

            {notes.length === 0 ? (
                <div>
                    <h5>No notes found</h5>
                    <p>Create your first note to get started.</p>
                    <Link to="/notes/new">
                        <button>Create Note</button>
                    </Link>
                </div>
            ) : (
                <div>
                    {notes.map((note) => (
                        <Link key={note._id} to={`/notes/${note._id}`}>
                            <div>
                                <h5>{note.title || "Untitled"}</h5>
                                <small>
                                    Last Updated: {new Date(note.updatedAt).toLocaleString()}
                                </small>
                            </div>
                        </Link>
                    ))}

                </div>
            )}
        </main>
    );
}

export default Notes;
