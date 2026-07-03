import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { showToast } from "../../components/Toast.jsx";

import { login } from "../../apiService/auth.js";
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
        <main>
            Login page
            <form onSubmit={handeleLogin}>
                <span>Email: </span>
                <input type="meail" id="email" name="email" required disabled={isLoggingIn}
                    value={email} onChange={(e) => setemail(e.target.value)}/>
                <br />
                <span>Password: </span>
                <input type="password" id="password" name="password" required disabled={isLoggingIn}
                    value={password} onChange={(e) => setpassword(e.target.value)}/>
                <br />
                <button type="submit" disabled={isLoggingIn}>Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </main>
    );
}

export default Login;
