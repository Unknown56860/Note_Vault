import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

import Home from "./pages/Home";

import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";

import Notes from "./pages/notes/Notes";
import Note from "./pages/notes/Note";

import NotFound from "./pages/error/404";

function App() {
    return (
        <BrowserRouter>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <Toast />
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/notes" element={<Notes />} />
                    <Route path="/notes/new" element={<Note />} />
                    <Route path="/notes/:id" element={<Note />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
