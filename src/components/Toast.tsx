import { useState, useEffect } from 'react';

let showToastFn: ((message: string) => void) | null = null;

export function triggerToast(message: string) {
  if (showToastFn) showToastFn(message);
}

const Toast = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showToastFn = (msg: string) => {
      setMessage(msg);
      setVisible(true);
      setTimeout(() => setVisible(false), 2500);
    };
    return () => { showToastFn = null; };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-tds-24 left-1/2 -translate-x-1/2 z-50 animate-[fadeInUp_0.3s_ease-out]">
      <div className="flex items-center gap-tds-8 px-tds-16 py-tds-12 bg-tds-surface-bg-primary-inverse-default text-tds-text-heading-inverse-only-white rounded-tds-md shadow-lg text-[13px] font-medium">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {message}
      </div>
    </div>
  );
};

export default Toast;
