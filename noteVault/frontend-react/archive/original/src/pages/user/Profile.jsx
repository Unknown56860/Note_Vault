import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { showToast } from "../../components/Toast.jsx";
import { profile, updateProfile, deleteProfile, logout } from "../../apiService/auth.js";

import states from "../../utils/states.js";

function Profile() {
    const [loading, setloading] = useState(false);
    const [editing, setediting] = useState(false);
    const [submitting, setsubmitting] = useState(false);

    const [id, setid] = useState("");

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [notescount, setnotescount] = useState("");
    const [created, setcreated] = useState("");
    const [updated, setupdated] = useState("");

    const navigate = useNavigate();

    const userEmail = states((state) => state.email);
    const setEmail = states((state) => state.setEmail);

    useEffect(() => {
        if(!editing) { 
            setloading(true);
            setpassword("");
            profile().then((response) => {
                if(response.data?.success ?? false) {
                    const profile = response.data.profile;
                    setEmail(profile.email);
                    setid(profile.id);
                    setname(profile.name);
                    setemail(profile.email);
                    setnotescount(profile.notesCount);
                    setcreated(new Date(profile.createdAt).toLocaleString());
                    setupdated(new Date(profile.updatedAt).toLocaleString());
                } else {
                    showToast("Failed to retrieve profile details", false);
                }
            }).catch((error) => {
                showToast("Network error. Unable to reach server.", false);
            }).finally(() => {
                setloading(false);
                if(!userEmail) {
                    navigate("/login");
                }
            });
        }
    }, [editing]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const confirmation = window.confirm("Confirm update profile?");
        if(!confirmation) { return; }

        setsubmitting(true);

        const newData = {name: name, email: email, password: password};

        updateProfile(newData).then((response) => {
            if(response.data) {
                showToast(response.data.message, response.data.success);
                if(response.data.success) {
                    setediting(false);
                }
            } else {
                showToast("Error during update, please reload the page.", false);
            }
        }).catch((error) => {
            showToast("Network error, please try again later.", false);
            console.log(error);
        }).finally(() => {
            setsubmitting(false);
            email ?? setEmail(email);
        });
    }

    const handleDelete = () => {
        const confirmation = window.confirm("This action cannot be undone. Are you sure?")
        if(!confirmation) { return; }
        setsubmitting(true);
        deleteProfile().then((response) => {
            if(response.data) {
                showToast(response.data.message, response.data.success);
                if(response.data.success) {
                    setEmail(null);
                    navigate("/");
                }
            }
        }).catch((error) => {
            showToast("Network error, unable to reach server.", false);
            console.log(error);
        }).finally(() => {
            setsubmitting(false);
        });
    }

    if(loading) {
        return (
            <main>Loading profile info...</main>
        );
    }

    return (
        <main>
            { editing ? <div>
                <span>Update Profile</span>
                <form onSubmit={handleUpdate}>
                    <span>Name: </span>
                    <input type="text" id="name" name="name" disabled={submitting}
                        value={name} onChange={(e) => setname(e.target.value)}/>
                    <br />
                    <span>Email: </span>
                    <input type="email" id="email" name="email" disabled={submitting}
                        value={email} onChange={(e) => setemail(e.target.value)}/>
                    <br />
                    <span>Password: </span>
                    <input type="password" id="password" name="password" disabled={submitting}
                        value={password} onChange={(e) => setpassword(e.target.value)}/>
                    <br />
                    <button type="submit" disabled={submitting}>Save</button>
                    <button type="button" onClick={() => setediting(false)} disabled={submitting}>Cancel</button>
                </form>
            </div> : <div>
                <span>Profile Info</span>
                <table>
                    <tbody>
                        <tr>
                            <td>Profile Id:</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>Total notes:</td>
                            <td>{notescount}</td>
                        </tr>
                        <tr>
                            <td>Created at:</td>
                            <td>{created}</td>
                        </tr>
                        <tr>
                            <td>Updated at:</td>
                            <td>{updated}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => setediting(true)} disabled={submitting}>Update</button>
                <button onClick={handleDelete} disabled={submitting}>Delete</button>
            </div>
            }
        </main>
    );
}

export default Profile;
