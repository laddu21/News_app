import React, { useEffect, useState } from 'react';

// Simple global toast that listens for window 'toast' events
// Usage: window.dispatchEvent(new CustomEvent('toast', { detail: 'message' }))
const Toast = () => {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            const text = typeof e.detail === 'string' ? e.detail : '';
            if (!text) return;
            setMessage(text);
            setVisible(true);
            if (timeoutId) clearTimeout(timeoutId);
            const id = setTimeout(() => setVisible(false), 1800);
            setTimeoutId(id);
        };
        window.addEventListener('toast', handler);
        return () => {
            window.removeEventListener('toast', handler);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    if (!visible) return null;
    return (
        <div className="toast-container">
            <div className="toast">{message}</div>
        </div>
    );
};

export default Toast;

