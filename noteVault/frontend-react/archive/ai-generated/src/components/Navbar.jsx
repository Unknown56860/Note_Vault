import { Link, useNavigate } from "react-router-dom";

import { logout } from "../apiService/auth.js";
import { showToast } from "./Toast.jsx";

import states from "../utils/states.js";

function Navbar() {
    const navigate = useNavigate();

    const userEmail = states((state) => state.email);
    const setEmail = states((state) => state.setEmail);

    const handleLogout = () => {
        logout()
            .then((response) => {
                if (response.data) {
                    showToast(response.data.message, response.data.success);
                    setEmail(null);
                } else {
                    showToast("Network error, unable to reach server.", false);
                }
            })
            .catch(() => {
                showToast("Unable to logout.", false);
            })
            .finally(() => {
                navigate("/");
            });
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm"
            style={{ backgroundColor: "#3D2914" }}
        >
            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center gap-2 fw-semibold"
                >
                    {/* <img
                        src=""
                        alt="Note Vault Logo"
                        className="rounded"
                        style={{
                            width: "42px",
                            height: "42px",
                            objectFit: "cover"
                        }}
                    /> */}

                    <div className="d-flex flex-column lh-1">
                        <span className="fs-5">Note Vault</span>
                        <small
                            className="fw-normal"
                            style={{ color: "#D4A574" }}
                        >
                            Your Digital Library
                        </small>
                    </div>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >

                    {!userEmail ? (
                        <ul className="navbar-nav ms-auto align-items-lg-center">

                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item ms-lg-2">
                                <Link
                                    to="/register"
                                    className="btn btn-success rounded-pill px-4"
                                >
                                    Create Account
                                </Link>
                            </li>

                        </ul>
                    ) : (
                        <>
                            <ul className="navbar-nav ms-auto">

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/notes/new"
                                    >
                                        New Note
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/notes"
                                    >
                                        My Notes
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/profile"
                                    >
                                        Profile
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link text-decoration-none"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>

                            </ul>

                            <div className="ms-lg-4 mt-3 mt-lg-0">

                                <div
                                    className="d-flex align-items-center rounded-pill px-3 py-2"
                                    style={{
                                        backgroundColor: "#5C4033",
                                        minWidth: "220px"
                                    }}
                                >

                                    <img
                                        src=""
                                        alt="Profile"
                                        className="rounded-circle me-2 flex-shrink-0"
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <small
                                        className="text-truncate"
                                        style={{
                                            color: "#E8D5B5"
                                        }}
                                    >
                                        {userEmail}
                                    </small>

                                </div>

                            </div>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
