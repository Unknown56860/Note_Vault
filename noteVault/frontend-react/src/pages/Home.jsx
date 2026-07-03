import { Link } from "react-router-dom";

import heroImg from "../assets/hero.webp";

import writeImg from "../assets/writing.png";
import organiseImg from "../assets/binder.png";
import anytimeImg from "../assets/flying.png";

function Home() {
    return (
        <main className="container py-5">

            <div className="row align-items-center g-5">

                <div className="col-lg-6">
                    <span className="badge text-bg-success mb-3">Your Digital Vault</span>

                    <h1 className="display-4 fw-bold">
                        Organize every idea in one place.
                    </h1>

                    <p className="lead text-secondary">
                        Capture thoughts, study notes, project ideas and personal journals in a
                        clean, distraction-free workspace inspired by a classic library.
                    </p>

                    <div className="d-flex gap-3 mt-4">
                        <Link to="/register" className="btn btn-success">
                            Get Started
                        </Link>

                        <Link to="/login" className="btn btn-outline-dark">
                            Open Vault
                        </Link>
                    </div>
                </div>

                <div className="col-lg-6 text-center">
                    <img
                        src={heroImg}
                        alt="Library Illustration"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: 420, objectFit: "cover" }}
                    />
                </div>

            </div>

            <div className="row text-center g-4 mt-5">

                <div className="col-md-4">
                    <img
                        src={writeImg}
                        alt=""
                        className="mb-3"
                        style={{ width: 56, height: 56, objectFit: "contain" }}
                    />
                    <h5>Write Naturally</h5>
                    <p className="text-secondary">
                        Create notes just like writing in your favorite notebook.
                    </p>
                </div>

                <div className="col-md-4">
                    <img
                        src={organiseImg}
                        alt=""
                        className="mb-3"
                        style={{ width: 56, height: 56, objectFit: "contain" }}
                    />
                    <h5>Stay Organized</h5>
                    <p className="text-secondary">
                        Keep every note neatly stored inside your personal vault.
                    </p>
                </div>

                <div className="col-md-4">
                    <img
                        src={anytimeImg}
                        alt=""
                        className="mb-3"
                        style={{ width: 56, height: 56, objectFit: "contain" }}
                    />
                    <h5>Access Anytime</h5>
                    <p className="text-secondary">
                        Your knowledge remains available whenever inspiration strikes.
                    </p>
                </div>

            </div>

        </main>
    );
}

export default Home;
