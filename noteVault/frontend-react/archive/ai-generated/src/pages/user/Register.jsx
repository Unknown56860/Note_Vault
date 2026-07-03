import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { showToast } from "../../components/Toast.jsx";
import { register } from "../../apiService/auth.js";

function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [isRegistering, setRegistering] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        setRegistering(true);

        const userData = {
            name: name,
            email: email,
            password: password
        };

        register(userData)
            .then((response) => {
                if (response.data) {
                    showToast(response.data.message, response.data.success);

                    if (response.data.success) {
                        navigate("/login");
                    }
                } else {
                    showToast("Registration failed. Please try again.", false);
                }
            })
            .catch(() => {
                showToast("Network error. Please try again later!", false);
            })
            .finally(() => {
                setRegistering(false);
            });
    };

    return (
        <main
            className="py-5"
            style={{
                backgroundColor: "#E8D5B5",
                minHeight: "100vh"
            }}
        >
            <div className="container">

                <div className="row justify-content-center align-items-center">

                    <div className="col-lg-5 col-md-8">

                        <div className="card border-0 shadow">

                            <div className="card-body p-5">

                                <div className="text-center mb-4">

                                    <img
                                        src=""
                                        alt="Note Vault Logo"
                                        className="mb-3"
                                        style={{
                                            width: "72px",
                                            height: "72px",
                                            objectFit: "contain"
                                        }}
                                    />

                                    <h2
                                        className="fw-bold"
                                        style={{ color: "#2C3E50" }}
                                    >
                                        Create Your Account
                                    </h2>

                                    <p className="text-secondary mb-0">
                                        Start your personal digital notebook.
                                    </p>

                                </div>

                                <form onSubmit={handleRegister}>

                                    <div className="mb-3">

                                        <label
                                            htmlFor="name"
                                            className="form-label"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            required
                                            disabled={isRegistering}
                                            value={name}
                                            onChange={(e) =>
                                                setname(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            required
                                            disabled={isRegistering}
                                            value={email}
                                            onChange={(e) =>
                                                setemail(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="mb-4">

                                        <label
                                            htmlFor="password"
                                            className="form-label"
                                        >
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            required
                                            disabled={isRegistering}
                                            value={password}
                                            onChange={(e) =>
                                                setpassword(e.target.value)
                                            }
                                        />

                                        <div className="form-text">
                                            Choose a password you'll remember.
                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isRegistering}
                                        className="btn btn-success w-100 rounded-pill py-2"
                                    >
                                        {isRegistering
                                            ? "Creating Account..."
                                            : "Register"}
                                    </button>

                                </form>

                                <hr className="my-4" />

                                <div className="text-center">

                                    <small className="text-secondary">
                                        Already have an account?
                                    </small>

                                    <br />

                                    <Link
                                        to="/login"
                                        className="btn btn-outline-dark rounded-pill mt-3 px-4"
                                    >
                                        Login
                                    </Link>

                                </div>

                            </div>

                        </div>

                        <div className="text-center mt-4 text-secondary">

                            <small>
                                Organize notes, ideas, projects and research in
                                one secure place.
                            </small>

                        </div>

                    </div>

                    <div className="col-lg-5 d-none d-lg-block">

                        <img
                            src=""
                            alt="Notebook illustration"
                            className="img-fluid rounded-4 shadow"
                            style={{
                                width: "100%",
                                maxHeight: "620px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

                </div>

            </div>
        </main>
    );
}

export default Register;
