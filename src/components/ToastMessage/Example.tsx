/**
 * ToastMessage Usage Example
 *
 * This file demonstrates how to integrate and use the ToastMessage component
 * in your React application.
 *
 * Usage Pattern:
 * 1. Import the ToastMessage component
 * 2. Create state for the message
 * 3. Add ToastMessage to your render tree
 * 4. Call setMessage() with your message text to show the toast
 * 5. The toast will auto-dismiss after 10 seconds or when the close button is clicked
 */

import { useState } from 'react';
import { ToastMessage } from 'src/components';

/**
 * Example App Component showing ToastMessage integration
 */
export default function ExampleApp() {
  const [toastMessage, setToastMessage] = useState('');

  const handleShowToast = (message: string) => {
    setToastMessage(message);
  };

  const handleSuccess = () => {
    handleShowToast('✓ Operation completed successfully!');
  };

  const handleError = () => {
    handleShowToast('✗ An error occurred. Please try again.');
  };

  const handleWarning = () => {
    handleShowToast('⚠ Please review this action before proceeding.');
  };

  const handleInfo = () => {
    handleShowToast('ℹ Here is some helpful information.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Toast Message Component - Place at top level for global access */}
      <ToastMessage message={toastMessage} setMessage={setToastMessage} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Toast Message Example</h1>
        <p className="text-gray-600 mb-12">
          Click the buttons below to trigger toast notifications that automatically disappear
          after 10 seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Success Button */}
          <button
            onClick={handleSuccess}
            className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Show Success Toast
          </button>

          {/* Error Button */}
          <button
            onClick={handleError}
            className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Show Error Toast
          </button>

          {/* Warning Button */}
          <button
            onClick={handleWarning}
            className="px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Show Warning Toast
          </button>

          {/* Info Button */}
          <button
            onClick={handleInfo}
            className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
          >
            Show Info Toast
          </button>
        </div>

        {/* Code Example */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Integration Guide</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
            {`// 1. Import the component
import { ToastMessage } from 'src/components';

// 2. Create state in your component
const [toastMessage, setToastMessage] = useState('');

// 3. Add the component to your JSX
<ToastMessage message={toastMessage} setMessage={setToastMessage} />

// 4. Show a toast by calling setToastMessage
const handleClick = () => {
  setToastMessage('Success! Your action was completed.');
  // Toast automatically disappears after 10 seconds
  // or when the user clicks the close button
};`}
          </pre>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Centered Position</h3>
            <p className="text-gray-600">Toast appears centered at the top of the viewport</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">⏱️ Auto-Dismiss</h3>
            <p className="text-gray-600">Automatically disappears after 10 seconds</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">✕ Close Button</h3>
            <p className="text-gray-600">Users can manually close the toast anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
