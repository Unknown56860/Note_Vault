import { Link, useNavigate } from "react-router-dom";

import { showToast } from "./Toast.jsx";
import { logout } from "../apiService/auth.js";

import states from "../utils/states.js";

import logo from "../assets/vault.png";
import add from "../assets/add.png";
import profile from "../assets/user.png"

function Navbar() {
    const navigate = useNavigate();
    
    const userEmail = states((state) => state.email);
    const setEmail = states((state) => state.setEmail);
    
    const handleLogout = () => {
        logout().then((response) => {
            if(response.data) {
                showToast(response.data.message, response.data.success);
                setEmail(null);
            } else {
                showToast("Network error, unable to reach server.", false);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            navigate("/");
        });
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm py-2">
            <div className="container">

                <Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
                    <img
                        src={logo}
                        alt="Logo"
                        className="me-2 rounded"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                    />
                    <div>
                        <h5 className="mb-0">Note Vault</h5>
                        <small className="text-secondary">Your Digital Notebook</small>
                    </div>
                </Link>

                {!userEmail ? (
                    <div className="d-flex gap-2">
                        <Link to="/login" className="btn btn-outline-dark btn-sm">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-success btn-sm">
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="d-flex align-items-center gap-3">

                        <div className="d-flex gap-2">
                            <Link to="/notes/new" className="btn btn-success btn-sm">
                                <img
                                    src={add}
                                    alt=""
                                    style={{ width: 16, height: 16, objectFit: "contain" }}
                                    className="me-1"
                                />
                                Add Note
                            </Link>

                            <Link to="/notes" className="btn btn-outline-dark btn-sm">
                                My Notes
                            </Link>

                            <Link to="/profile" className="btn btn-outline-secondary btn-sm">
                                Profile
                            </Link>

                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>

                        <div className="d-flex align-items-center">
                            <img
                                src={profile}
                                alt="Profile"
                                className="rounded-circle me-2"
                                style={{ width: 28, height: 28, objectFit: "cover" }}
                            />
                            <small className="text-secondary">{userEmail}</small>
                        </div>

                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
