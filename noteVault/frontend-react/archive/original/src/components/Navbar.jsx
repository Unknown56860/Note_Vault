import { Link, useNavigate } from "react-router-dom";

import { showToast } from "./Toast.jsx";
import { logout } from "../apiService/auth.js";

import states from "../utils/states.js";

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
        <nav>
            <Link to="/">
                {/* <img src="" alt="logo" /> */}
                <p>Note Vault</p>
            </Link>
            {!userEmail ?
                <div>
                    <p><Link to="/login">Login</Link></p>
                    <p><Link to="/register">Register</Link></p>
                </div>
            :
                <div>
                    <div>
                        <p><Link to="/notes/new">Add note</Link></p>
                        <p><Link to="/notes">My notes</Link></p>
                        <p><Link to="/profile">Profile</Link></p>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                    <div>
                        <p>{userEmail}</p>
                    </div>
                </div>
            }
        </nav>
    );
}

// if not logged in: left side: Note Vault with icon, contact, login
// logged in: left side: Note Vault with icon, new note, my notes, profile, logout; right side: user email

export default Navbar;
