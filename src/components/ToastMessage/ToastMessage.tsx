/**
 * ToastMessage Component
 *
 * Purpose:
 * Displays temporary notification messages to users with auto-dismiss functionality.
 * The toast appears at the center-top of the application for 10 seconds before automatically disappearing.
 *
 * Props:
 * - message (string): The notification message to display
 * - setMessage (function): Callback to clear the message (called on close or auto-dismiss)
 * - type (optional): Type of toast - 'success', 'error', or 'default' (default: 'default')
 *
 * Behavior:
 * - Displays centered at the top of the viewport
 * - Auto-dismisses after 10 seconds
 * - Includes a close button (X icon) for manual dismissal
 * - Only renders when message is provided and non-empty
 *
 * Accessibility:
 * - Uses semantic role attribute for screen readers
 * - Includes ARIA live region to announce messages
 * - Close button has descriptive label for accessibility
 * - Keyboard accessible close button
 */

import React, { useEffect } from 'react';

interface ToastMessageProps {
  message: string;
  setMessage: (message: string) => void;
  type?: 'success' | 'error' | 'default';
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, setMessage, type = 'default' }) => {
  // Determine colors based on type
  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          closeText: 'text-green-400 hover:text-green-600',
          ring: 'focus:ring-green-500',
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          closeText: 'text-red-400 hover:text-red-600',
          ring: 'focus:ring-red-500',
        };
      default:
        return {
          bg: 'bg-white',
          text: 'text-gray-800',
          closeText: 'text-gray-400 hover:text-gray-600',
          ring: 'focus:ring-blue-500',
        };
    }
  };

  const colors = getColorClasses();

  // Auto-dismiss toast after 10 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  // Don't render if no message
  if (!message) {
    return null;
  }

  const handleClose = () => {
    setMessage('');
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className={`${colors.bg} shadow-lg rounded-lg px-6 py-4 max-w-md flex items-center justify-between gap-4`}>
        {/* Message text */}
        <p className={`${colors.text} text-sm font-medium flex-1`}>{message}</p>

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close notification"
          className={`flex-shrink-0 ${colors.closeText} focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.ring} rounded-md p-1 transition-colors`}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ToastMessage;
