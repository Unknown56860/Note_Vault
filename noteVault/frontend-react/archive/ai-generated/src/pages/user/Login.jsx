import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../apiService/auth.js";
import { showToast } from "../../components/Toast.jsx";

import states from "../../utils/states.js";

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [isLoggingIn, setLoggingIn] = useState(false);

    const navigate = useNavigate();

    const setEmail = states((state) => state.setEmail);

    const handeleLogin = (e) => {
        e.preventDefault();

        setLoggingIn(true);

        const credentials = {
            email: email,
            password: password
        };

        login(credentials)
            .then((response) => {
                if (response.data) {
                    showToast(response.data.message, response.data.success);

                    if (response.data.success) {
                        setEmail(credentials.email);
                        navigate("/notes");
                    }
                } else {
                    showToast("Login failed. Please try again.", false);
                }
            })
            .catch(() => {
                showToast("Network error. Please try again later.", false);
            })
            .finally(() => {
                setLoggingIn(false);
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

                    <div className="col-lg-5 d-none d-lg-block">

                        <img
                            src=""
                            alt="Study desk"
                            className="img-fluid rounded-4 shadow"
                            style={{
                                width: "100%",
                                maxHeight: "620px",
                                objectFit: "cover"
                            }}
                        />

                    </div>

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
                                        style={{
                                            color: "#2C3E50"
                                        }}
                                    >
                                        Welcome Back
                                    </h2>

                                    <p className="text-secondary mb-0">
                                        Continue building your personal library.
                                    </p>

                                </div>

                                <form onSubmit={handeleLogin}>

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
                                            disabled={isLoggingIn}
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
                                            disabled={isLoggingIn}
                                            value={password}
                                            onChange={(e) =>
                                                setpassword(e.target.value)
                                            }
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoggingIn}
                                        className="btn btn-success w-100 rounded-pill py-2"
                                    >
                                        {isLoggingIn
                                            ? "Signing In..."
                                            : "Login"}
                                    </button>

                                </form>

                                <hr className="my-4" />

                                <div className="text-center">

                                    <small className="text-secondary">
                                        Don't have an account?
                                    </small>

                                    <br />

                                    <Link
                                        to="/register"
                                        className="btn btn-outline-dark rounded-pill mt-3 px-4"
                                    >
                                        Create Account
                                    </Link>

                                </div>

                            </div>

                        </div>

                        <div className="text-center mt-4 text-secondary">

                            <small>
                                Secure authentication keeps your notes private
                                and accessible only to you.
                            </small>

                        </div>

                    </div>

                </div>

            </div>
        </main>
    );
}

export default Login;
