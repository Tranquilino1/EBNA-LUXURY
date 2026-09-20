import { Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
  size?: number | 'small' | 'medium' | 'large';
  className?: string;
}

export function Loader({ message = '', fullScreen = false, size = 32, className = '' }: LoaderProps) {
  const pixelSize = typeof size === 'number' ? size : size === 'small' ? 20 : size === 'large' ? 48 : 32;

  const loaderContent = (
    <div className={`loader-container ${className}`}>
      <Loader2 className="animate-spin text-brand" size={pixelSize} />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loader-overlay glass-bg-prominent">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
}
