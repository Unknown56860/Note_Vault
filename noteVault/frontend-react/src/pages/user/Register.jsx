import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { showToast } from "../../components/Toast.jsx";

import { register } from "../../apiService/auth.js";

import doorIco from "../../assets/open-door.png";

function Register() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [isRegistering, setRegistering] = useState(false);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setRegistering(true);

        const userData = { name: name, email: email, password: password };
        
        register(userData).then((response) => {
            if(response.data) {
                showToast(response.data.message, response.data.success);
                if(response.data.success) {
                    navigate("/login");
                }
            } else {
                showToast("Registration failed. Please try again.", false);
            }
        }).catch((error) => {
            showToast("Network error. Please try again later!", false);
        }).finally(() => {
            setRegistering(false);
        });
    }
    return (
        <main className="container py-5">

            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">
                                <img
                                    src={doorIco}
                                    alt="Register"
                                    className="mb-3"
                                    style={{ width: 72, height: 72, objectFit: "contain" }}
                                />
                                <h2 className="mb-1">Create Your Vault</h2>
                                <p className="text-secondary mb-0">
                                    Start organizing your knowledge with a free account.
                                </p>
                            </div>

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        required
                                        disabled={isRegistering}
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        required
                                        disabled={isRegistering}
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        disabled={isRegistering}
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={isRegistering}
                                >
                                    {isRegistering ? "Creating Account..." : "Register"}
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0 text-secondary">
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </p>

                        </div>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default Register;
