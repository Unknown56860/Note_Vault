import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    profile,
    updateProfile,
    deleteProfile
} from "../../apiService/auth.js";

import { showToast } from "../../components/Toast.jsx";

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
        if (!editing) {
            setloading(true);
            setpassword("");

            profile()
                .then((response) => {
                    if (response.data?.success ?? false) {
                        const profile = response.data.profile;

                        setEmail(profile.email);

                        setid(profile.id);
                        setname(profile.name);
                        setemail(profile.email);

                        setnotescount(profile.notesCount);

                        setcreated(
                            new Date(profile.createdAt).toLocaleString()
                        );

                        setupdated(
                            new Date(profile.updatedAt).toLocaleString()
                        );
                    } else {
                        showToast(
                            "Failed to retrieve profile details.",
                            false
                        );
                    }
                })
                .catch(() => {
                    showToast(
                        "Network error. Unable to reach server.",
                        false
                    );
                })
                .finally(() => {
                    setloading(false);

                    if (!userEmail) {
                        navigate("/login");
                    }
                });
        }
    }, [editing]);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!window.confirm("Confirm profile update?")) return;

        setsubmitting(true);

        updateProfile({
            name,
            email,
            password
        })
            .then((response) => {
                if (response.data) {
                    showToast(
                        response.data.message,
                        response.data.success
                    );

                    if (response.data.success) {
                        setediting(false);
                    }
                } else {
                    showToast(
                        "Error updating profile.",
                        false
                    );
                }
            })
            .catch(() => {
                showToast(
                    "Network error. Please try again later.",
                    false
                );
            })
            .finally(() => {
                setsubmitting(false);
                setEmail(email);
            });
    };

    const handleDelete = () => {
        if (
            !window.confirm(
                "Delete your account permanently? This action cannot be undone."
            )
        ) {
            return;
        }

        setsubmitting(true);

        deleteProfile()
            .then((response) => {
                if (response.data) {
                    showToast(
                        response.data.message,
                        response.data.success
                    );

                    if (response.data.success) {
                        setEmail(null);
                        navigate("/");
                    }
                }
            })
            .catch(() => {
                showToast(
                    "Network error. Unable to reach server.",
                    false
                );
            })
            .finally(() => {
                setsubmitting(false);
            });
    };

    if (loading) {
        return (
            <main
                className="container py-5"
                style={{ minHeight: "80vh" }}
            >
                <div className="text-center">

                    <div
                        className="spinner-border text-success mb-3"
                        role="status"
                    />

                    <h4>Loading profile...</h4>

                </div>
            </main>
        );
    }

    return (
        <main
            className="py-5"
            style={{
                backgroundColor: "#E8D5B5",
                minHeight: "100vh"
            }}
        >
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        <div className="card border-0 shadow">

                            <div className="card-body p-5">

                                <div className="text-center mb-5">

                                    <img
                                        src=""
                                        alt="Profile"
                                        className="rounded-circle shadow mb-3"
                                        style={{
                                            width: "110px",
                                            height: "110px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <h2
                                        className="fw-bold"
                                        style={{
                                            color: "#2C3E50"
                                        }}
                                    >
                                        My Profile
                                    </h2>

                                    <p className="text-secondary mb-0">
                                        Manage your account information and preferences.
                                    </p>

                                </div>

                                {editing ? (

                                    <form onSubmit={handleUpdate}>

                                        <div className="row g-3">

                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Full Name
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={name}
                                                    disabled={submitting}
                                                    onChange={(e) =>
                                                        setname(e.target.value)
                                                    }
                                                />

                                            </div>

                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Email Address
                                                </label>

                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={email}
                                                    disabled={submitting}
                                                    onChange={(e) =>
                                                        setemail(e.target.value)
                                                    }
                                                />

                                            </div>

                                            <div className="col-12">

                                                <label className="form-label">
                                                    New Password
                                                </label>

                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Leave blank to keep existing password"
                                                    value={password}
                                                    disabled={submitting}
                                                    onChange={(e) =>
                                                        setpassword(e.target.value)
                                                    }
                                                />

                                            </div>

                                        </div>

                                        <div className="d-flex gap-3 mt-4">

                                            <button
                                                className="btn btn-success rounded-pill px-4"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                Save Changes
                                            </button>

                                            <button
                                                className="btn btn-outline-secondary rounded-pill px-4"
                                                type="button"
                                                disabled={submitting}
                                                onClick={() =>
                                                    setediting(false)
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </form>

                                ) : (

                                    <>
                                        <div className="table-responsive">

                                            <table className="table table-bordered align-middle">

                                                <tbody>

                                                    <tr>
                                                        <th
                                                            style={{ width: "30%" }}
                                                        >
                                                            Profile ID
                                                        </th>
                                                        <td className="text-break">
                                                            {id}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{name}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{email}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Total Notes</th>
                                                        <td>
                                                            <span className="badge text-bg-success">
                                                                {notescount}
                                                            </span>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <th>Account Created</th>
                                                        <td>{created}</td>
                                                    </tr>

                                                    <tr>
                                                        <th>Last Updated</th>
                                                        <td>{updated}</td>
                                                    </tr>

                                                </tbody>

                                            </table>

                                        </div>

                                        <div className="d-flex flex-wrap gap-3 mt-4">

                                            <button
                                                className="btn btn-success rounded-pill px-4"
                                                onClick={() =>
                                                    setediting(true)
                                                }
                                                disabled={submitting}
                                            >
                                                Edit Profile
                                            </button>

                                            <button
                                                className="btn btn-outline-danger rounded-pill px-4"
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

            </div>
        </main>
    );
}

export default Profile;
