import { Link } from "react-router-dom";

function Home() {
    return (
        <main
            className="py-5"
            style={{
                backgroundColor: "#E8D5B5",
                minHeight: "100vh"
            }}
        >
            <div className="container">

                {/* Hero */}

                <section
                    className="rounded-4 shadow overflow-hidden mb-5"
                    style={{
                        backgroundColor: "#F8F9FA"
                    }}
                >
                    <div className="row g-0 align-items-center">

                        <div className="col-lg-6 p-5">

                            <span className="badge text-bg-success rounded-pill mb-3">
                                Your Digital Library
                            </span>

                            <h1
                                className="display-5 fw-bold mb-4"
                                style={{ color: "#2C3E50" }}
                            >
                                Keep every idea,
                                <br />
                                note and thought
                                <br />
                                in one organized vault.
                            </h1>

                            <p className="lead text-secondary mb-4">
                                Note Vault is a calm, distraction-free workspace
                                inspired by bookshelves, journals and study
                                desks. Capture ideas instantly, revisit them
                                anytime and build your own personal knowledge
                                library.
                            </p>

                            <div className="d-flex flex-wrap gap-3">

                                <Link
                                    to="/register"
                                    className="btn btn-success btn-lg rounded-pill px-4"
                                >
                                    Start Writing
                                </Link>

                                <Link
                                    to="/login"
                                    className="btn btn-outline-dark btn-lg rounded-pill px-4"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>

                        <div className="col-lg-6">

                            <img
                                src=""
                                alt="Bookshelf workspace"
                                className="img-fluid w-100"
                                style={{
                                    height: "500px",
                                    objectFit: "cover"
                                }}
                            />

                        </div>

                    </div>
                </section>

                {/* Features */}

                <section className="mb-5">

                    <div className="text-center mb-5">

                        <h2
                            className="fw-bold"
                            style={{ color: "#2C3E50" }}
                        >
                            A notebook that stays organized
                        </h2>

                        <p className="text-secondary">
                            Everything you need to write, edit and manage notes
                            without unnecessary distractions.
                        </p>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="card h-100 shadow-sm border-0">

                                <div className="card-body text-center">

                                    <img
                                        src=""
                                        alt="Notebook icon"
                                        className="mb-3"
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <h5>Create Notes</h5>

                                    <p className="text-secondary">
                                        Capture ideas, meeting notes, lectures,
                                        reminders and research in a clean editor.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card h-100 shadow-sm border-0">

                                <div className="card-body text-center">

                                    <img
                                        src=""
                                        alt="Library icon"
                                        className="mb-3"
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <h5>Organize Everything</h5>

                                    <p className="text-secondary">
                                        Browse your collection like a well-kept
                                        bookshelf with recently updated notes
                                        always within reach.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card h-100 shadow-sm border-0">

                                <div className="card-body text-center">

                                    <img
                                        src=""
                                        alt="Lock icon"
                                        className="mb-3"
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <h5>Your Personal Vault</h5>

                                    <p className="text-secondary">
                                        Access only your notes through your
                                        account with secure authentication.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* Workflow */}

                <section className="row g-4 align-items-center mb-5">

                    <div className="col-lg-6">

                        <img
                            src=""
                            alt="Notebook illustration"
                            className="img-fluid rounded-4 shadow"
                            style={{
                                width: "100%",
                                maxHeight: "420px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

                    <div className="col-lg-6">

                        <h2
                            className="fw-bold mb-4"
                            style={{ color: "#2C3E50" }}
                        >
                            Simple workflow.
                            <br />
                            No clutter.
                        </h2>

                        <div className="list-group shadow-sm">

                            <div className="list-group-item py-3">
                                <strong>1.</strong> Create a free account.
                            </div>

                            <div className="list-group-item py-3">
                                <strong>2.</strong> Write your first note.
                            </div>

                            <div className="list-group-item py-3">
                                <strong>3.</strong> Update your notes whenever
                                ideas evolve.
                            </div>

                            <div className="list-group-item py-3">
                                <strong>4.</strong> Build your own searchable
                                knowledge library.
                            </div>

                        </div>

                    </div>

                </section>

                {/* CTA */}

                <section
                    className="rounded-4 text-center p-5 shadow"
                    style={{
                        backgroundColor: "#5C4033",
                        color: "#F8F9FA"
                    }}
                >

                    <h2 className="fw-bold mb-3">
                        Your next great idea deserves a permanent place.
                    </h2>

                    <p className="mb-4 text-light">
                        Whether it's code snippets, study notes, project plans
                        or journal entries, keep everything together inside your
                        digital notebook.
                    </p>

                    <div className="d-flex justify-content-center flex-wrap gap-3">

                        <Link
                            to="/register"
                            className="btn btn-success btn-lg rounded-pill px-4"
                        >
                            Create Free Account
                        </Link>

                        <Link
                            to="/login"
                            className="btn btn-outline-light btn-lg rounded-pill px-4"
                        >
                            Login
                        </Link>

                    </div>

                </section>

            </div>
        </main>
    );
}

export default Home;
