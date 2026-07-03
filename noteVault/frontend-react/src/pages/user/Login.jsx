import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { showToast } from "../../components/Toast.jsx";

import { login } from "../../apiService/auth.js";
import states from "../../utils/states.js";

import lockIco from "../../assets/lock.png";

function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    
    const [isLoggingIn, setLoggingIn] = useState(false); 

    const navigate = useNavigate();

    const setEmail = states((state) => state.setEmail);

    const handeleLogin = (e) => {
        e.preventDefault();
        setLoggingIn(true);

        const credentials = { email: email, password: password };
        
        login(credentials).then((response) => {
            if(response.data) {
                showToast(response.data.message, response.data.success);
                if(response.data.success) {
                    setEmail(credentials.email);
                    navigate("/notes");
                }
            } else {
                showToast("Login failed. Please try again.", false);
            }
        }).catch((error) => {
            showToast("Network error. Please try again later!", false);
        }).finally(() => {
            setLoggingIn(false);
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
                                    src={lockIco}
                                    alt="Login"
                                    className="mb-3"
                                    style={{ width: 72, height: 72, objectFit: "contain" }}
                                />
                                <h2 className="mb-1">Welcome Back</h2>
                                <p className="text-secondary mb-0">
                                    Sign in to access your personal note vault.
                                </p>
                            </div>

                            <form onSubmit={handeleLogin}>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        required
                                        disabled={isLoggingIn}
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
                                        disabled={isLoggingIn}
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={isLoggingIn}
                                >
                                    {isLoggingIn ? "Signing In..." : "Login"}
                                </button>

                            </form>

                            <hr />

                            <p className="text-center mb-0 text-secondary">
                                Don't have an account?{" "}
                                <Link to="/register">Create one</Link>
                            </p>

                        </div>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default Login;
