import { useEffect, useState } from "react";

import toastIco from "../assets/toast.png";

const toastTimeout = 3000;

let listener = null;

export function showToast(message, success = true) {
    listener?.({ message, success, id: Date.now() });
}

function Toast() {
    const [toast, setToast] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        listener = (data) => {
            setToast(data);
            setVisible(false);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => { setVisible(true); });
            });

            clearTimeout(window.__toastTimeout);

            window.__toastTimeout = setTimeout(() => {
                setVisible(false);
                setTimeout(() => { setToast(null); }, 300);
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
            className="position-fixed top-0 start-50 translate-middle-x pt-3"
            style={{ zIndex: 9999, pointerEvents: "none" }}
        >
            <div
                className={`alert ${toast.success ? "alert-success" : "alert-danger"} shadow`}
                style={{
                    minWidth: 320,
                    transform: visible ? "translateY(0)" : "translateY(-120%)",
                    opacity: visible ? 1 : 0,
                    transition: "all .3s ease"
                }}
            >
                <div className="d-flex align-items-center">

                    <img
                        src={toastIco}
                        alt="message"
                        className="me-2"
                        style={{ width: 24, height: 24, objectFit: "contain" }}
                    />

                    <div>
                        <strong>{toast.success ? "Success" : "Error"}</strong>
                        <div>{toast.message}</div>
                    </div>

                </div>
            </div>
        </div>
    );
}   

export default Toast;
