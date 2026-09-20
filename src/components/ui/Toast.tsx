import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle size={20} className="toast-icon-success" />,
    error: <AlertCircle size={20} className="toast-icon-error" />,
    info: <Info size={20} className="toast-icon-info" />
  };

  return (
    <div className={`toast-container toast-${type} glass-card`}>
      <div className="toast-content">
        {icons[type]}
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        <X size={18} />
      </button>
    </div>
  );
}
