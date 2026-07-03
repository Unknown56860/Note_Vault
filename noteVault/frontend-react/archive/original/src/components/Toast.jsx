import { useEffect, useState } from "react";

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
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, display: "flex",
            justifyContent: "center", pointerEvents: "none", zIndex: 9999, 
        }}>
            <div style={{ 
                marginTop: 20, padding: "12px 20px", borderRadius: 8, color: "#fff",
                background: toast.success ? "#16a34a" : "#dc2626",
                transform: visible ? "translateY(0)" : "translateY(-120%)",
                opacity: visible ? 1 : 0,
                transition: "transform 300ms ease, opacity 300ms ease", 
            }}>
                <strong>
                    {toast.success ? "Success" : "Error"}
                </strong>

                <div>{toast.message}</div>
            </div>
        </div>
    );
}   

export default Toast;
