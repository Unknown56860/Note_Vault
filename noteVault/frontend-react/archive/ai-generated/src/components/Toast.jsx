import { useEffect, useState } from "react";

const toastTimeout = 3000;

let listener = null;

export function showToast(message, success = true) {
    listener?.({
        id: Date.now(),
        message,
        success
    });
}

function Toast() {
    const [toast, setToast] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listener = (data) => {
            setToast(data);
            setVisible(false);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });

            clearTimeout(window.__toastTimeout);

            window.__toastTimeout = setTimeout(() => {
                setVisible(false);

                setTimeout(() => {
                    setToast(null);
                }, 250);

            }, toastTimeout);
        };

        return () => {
            listener = null;
            clearTimeout(window.__toastTimeout);
        };
    }, []);

    if (!toast) return null;

    return (
        <div
            className="position-fixed top-0 start-50 translate-middle-x p-3"
            style={{
                zIndex: 2000,
                pointerEvents: "none"
            }}
        >
            <div
                className={`alert shadow-lg border-0 d-flex align-items-center ${
                    toast.success ? "alert-success" : "alert-danger"
                }`}
                role="alert"
                style={{
                    minWidth: "340px",
                    maxWidth: "500px",
                    transform: visible
                        ? "translateY(0)"
                        : "translateY(-120%)",
                    opacity: visible ? 1 : 0,
                    transition: "all .25s ease"
                }}
            >
                <img
                    src=""
                    alt={toast.success ? "Success" : "Error"}
                    className="me-3 flex-shrink-0"
                    style={{
                        width: "28px",
                        height: "28px",
                        objectFit: "contain"
                    }}
                />

                <div className="flex-grow-1">

                    <div className="fw-semibold">
                        {toast.success
                            ? "Success"
                            : "Something went wrong"}
                    </div>

                    <small className="d-block">
                        {toast.message}
                    </small>

                </div>

            </div>
        </div>
    );
}

export default Toast;
