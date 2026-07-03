import { Link } from "react-router-dom";

import error404 from "../../assets/404-error.png";

const NotFound = () => {
    return (
        <main className="container py-5">

            <div className="row justify-content-center">
                <div className="col-lg-6">

                    <div className="card shadow-sm text-center">

                        <div className="card-body py-5">

                            <img
                                src={error404}
                                alt="404"
                                className="mb-4"
                                style={{ width: 140, height: 140, objectFit: "contain" }}
                            />

                            <h1 className="display-3 fw-bold">404</h1>

                            <h4 className="mb-3">Page Not Found</h4>

                            <p className="text-secondary mb-4">
                                The page you're looking for doesn't exist or has been moved.
                            </p>

                            <Link to="/" className="btn btn-success">
                                Return Home
                            </Link>

                        </div>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default NotFound;
