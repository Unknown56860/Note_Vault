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
        <main>
            Register Page
            <form onSubmit={handleRegister}>
                <span>Name: </span>
                <input type="text" id="name" name="name" required disabled={isRegistering}
                    value={name} onChange={(e) => setname(e.target.value)}/>
                <br />
                <span>Email: </span>
                <input type="email" id="email" name="email" required disabled={isRegistering}
                    value={email} onChange={(e) => setemail(e.target.value)}/>
                <br />
                <span>Password: </span>
                <input type="password" id="password" name="password" required disabled={isRegistering}
                    value={password} onChange={(e) => setpassword(e.target.value)}/>
                <br />
                <button type="submit" disabled={isRegistering}>Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </main>
    );
}

export default Register;
