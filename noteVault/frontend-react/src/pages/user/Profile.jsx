import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { showToast } from "../../components/Toast.jsx";
import { profile, updateProfile, deleteProfile, logout } from "../../apiService/auth.js";

import states from "../../utils/states.js";

import profileIco from "../../assets/user.png";

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
        <main className="container py-5">

            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <div className="card shadow-sm">

                        <div className="card-body p-4">

                            <div className="d-flex align-items-center mb-4">
                                <img
                                    src={profileIco}
                                    alt="Profile"
                                    className="rounded-circle me-3"
                                    style={{ width: 64, height: 64, objectFit: "cover" }}
                                />
                                <div>
                                    <h2 className="mb-1">My Profile</h2>
                                    <p className="text-secondary mb-0">
                                        Manage your account and personal information.
                                    </p>
                                </div>
                            </div>

                            {editing ? (
                                <form onSubmit={handleUpdate}>

                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            disabled={submitting}
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            disabled={submitting}
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Leave blank to keep password unchanged"
                                            disabled={submitting}
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-success" disabled={submitting}>
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setediting(false)}
                                            disabled={submitting}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </form>
                            ) : (
                                <>
                                    <table className="table table-striped align-middle">
                                        <tbody>
                                            <tr><th>Profile ID</th><td>{id}</td></tr>
                                            <tr><th>Name</th><td>{name}</td></tr>
                                            <tr><th>Email</th><td>{email}</td></tr>
                                            <tr><th>Total Notes</th><td>{notescount}</td></tr>
                                            <tr><th>Member Since</th><td>{created}</td></tr>
                                            <tr><th>Last Updated</th><td>{updated}</td></tr>
                                        </tbody>
                                    </table>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => setediting(true)}
                                            disabled={submitting}
                                        >
                                            Edit Profile
                                        </button>

                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={handleDelete}
                                            disabled={submitting}
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default Profile;
