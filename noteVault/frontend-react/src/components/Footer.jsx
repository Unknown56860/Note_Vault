import logo from "../assets/vault.png";
import gitIco from "../assets/github.svg";

function Footer() {
    return (
        <footer className="border-top mt-5 py-4 bg-body-tertiary">
            <div className="container">

                <div className="row gy-4 align-items-center">

                    {/* Brand */}
                    <div className="col-lg-4">
                        <div className="d-flex align-items-center">
                            <img
                                src={logo}
                                alt="Note Vault"
                                className="me-2"
                                style={{ width: 40, height: 40, objectFit: "cover" }}
                            />

                            <div>
                                <h6 className="mb-0">Note Vault</h6>
                                <small className="text-secondary">
                                    Organize ideas. Preserve knowledge.
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Project Links */}
                    <div className="col-lg-4 text-lg-center">
                        
                        <small className="d-block text-secondary">
                            Deployed on Vercel, Render & MongoDB Atlas
                        </small>
                        <a
                            href="https://github.com/Unknown56860/Note_Vault"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none d-inline-flex align-items-center gap-2"
                        >
                            <span>View Source on GitHub</span>
                            <img
                                src={gitIco}
                                alt=""
                                className="rounded"
                                style={{ width: 18, height: 18, objectFit: "cover" }}
                            />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="col-lg-4 text-lg-end">
                        <small className="text-secondary d-block">
                            © 2026 Note Vault
                        </small>

                        <small className="text-secondary">
                            Built with <strong>MERN</strong>
                        </small>
                    </div>

                </div>

                <hr className="my-4" />

                <div className="row">
                    <div className="col text-center">
                        <small className="text-secondary">
                            Background stock photo by{" "}
                            <a
                                href="https://www.vecteezy.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                            >
                                Vecteezy
                            </a>
                            {" • "}
                            Icons and logo by{" "}
                            <a
                                href="https://www.flaticon.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                            >
                                Flaticon
                            </a>
                            {/* {" • "}
                            Source code available on{" "}
                            <a
                                href="https://github.com/Unknown56860/Note_Vault"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                            >
                                GitHub
                            </a> */}
                        </small>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
