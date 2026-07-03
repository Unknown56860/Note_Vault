function Footer() {
    return (
        <footer
            className="mt-auto py-5 border-top"
            style={{
                backgroundColor: "#3D2914",
                color: "#E8D5B5"
            }}
        >
            <div className="container">

                <div className="row gy-4">

                    <div className="col-md-5">

                        <div className="d-flex align-items-center mb-3">

                            <img
                                src=""
                                alt="Note Vault Logo"
                                className="me-3"
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    objectFit: "cover"
                                }}
                            />

                            <div>
                                <h5 className="mb-1">
                                    Note Vault
                                </h5>

                                <small className="text-secondary">
                                    Organize ideas. Preserve knowledge.
                                </small>
                            </div>

                        </div>

                        <p className="mb-0 text-secondary">
                            A clean and distraction-free notebook for storing
                            lectures, project ideas, research, journals and
                            everyday thoughts.
                        </p>

                    </div>

                    <div className="col-md-3">

                        <h6 className="mb-3">
                            Explore
                        </h6>

                        <ul className="list-unstyled">

                            <li className="mb-2">
                                Home
                            </li>

                            <li className="mb-2">
                                My Notes
                            </li>

                            <li className="mb-2">
                                Profile
                            </li>

                        </ul>

                    </div>

                    <div className="col-md-4">

                        <h6 className="mb-3">
                            Built for Focus
                        </h6>

                        <p className="text-secondary mb-0">
                            Inspired by wooden bookshelves, aged notebooks and
                            organized study spaces. Every note is stored like a
                            carefully placed book in your personal library.
                        </p>

                    </div>

                </div>

                <hr className="border-secondary my-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

                    <small className="text-secondary">
                        © 2026 Note Vault. All rights reserved.
                    </small>

                    <small className="text-secondary">
                        Made for students, developers and lifelong learners.
                    </small>

                </div>

            </div>
        </footer>
    );
}

export default Footer;
