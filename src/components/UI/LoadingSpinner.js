import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div className="relative">
        <div className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
      </div>
      {text && (
        <p className={`${textSizes[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Full page loading overlay
export const LoadingOverlay = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

// Inline loading for components
export const InlineLoading = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <LoadingSpinner size="md" text={text} />
    </div>
  );
};

export default LoadingSpinner;