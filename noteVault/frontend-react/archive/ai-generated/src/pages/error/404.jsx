import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main
            className="container py-5"
            style={{
                minHeight: "80vh"
            }}
        >
            <div className="row justify-content-center">

                <div className="col-lg-7">

                    <div className="card border-0 shadow text-center">

                        <div className="card-body p-5">

                            <img
                                src=""
                                alt="Lost book illustration"
                                className="mb-4"
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    objectFit: "contain"
                                }}
                            />

                            <div
                                className="display-1 fw-bold"
                                style={{
                                    color: "#5C4033"
                                }}
                            >
                                404
                            </div>

                            <h2 className="mt-3">
                                This page isn't on the shelf.
                            </h2>

                            <p className="text-secondary mt-3 mb-4">
                                The page you're looking for may have been
                                removed, renamed or never existed. Return to
                                your library and continue writing.
                            </p>

                            <div className="d-flex justify-content-center gap-3 flex-wrap">

                                <Link
                                    to="/"
                                    className="btn btn-success rounded-pill px-4"
                                >
                                    Back Home
                                </Link>

                                <Link
                                    to="/notes"
                                    className="btn btn-outline-secondary rounded-pill px-4"
                                >
                                    My Notes
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default NotFound;
