import logo from "../assets/vault.png";

function Footer() {
    return (
        <footer className="border-top mt-5 py-4 bg-body-tertiary">
            <div className="container">

                <div className="row align-items-center">

                    <div className="col-md-6 d-flex align-items-center">
                        <img
                            src={logo}
                            alt="abcd"
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

                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                        <small className="text-secondary">
                            © 2026 Note Vault. All rights reserved.
                        </small>
                    </div>

                </div>

                <hr className="my-3" />

                <div className="row">
                    <div className="col-12 text-center">
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
                            . Icons and logo by{" "}
                            <a
                                href="https://www.flaticon.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                            >
                                Flaticon
                            </a>
                            .
                        </small>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
