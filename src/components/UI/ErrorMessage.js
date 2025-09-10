import React from 'react';
import Button from './Button';

const ErrorMessage = ({ 
  title = 'Something went wrong', 
  message = 'An unexpected error occurred. Please try again.', 
  onRetry,
  showRetry = true,
  className = '' 
}) => {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {showRetry && onRetry && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline error for smaller components
export const InlineError = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-3"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;