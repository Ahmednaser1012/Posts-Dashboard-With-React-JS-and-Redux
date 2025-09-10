import React, { useState, useEffect } from 'react';
import Button from './Button';

const SweetAlert = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  text = '',
  icon = 'warning', // warning, error, success, info, question
  showCancelButton = true,
  confirmButtonText = 'Yes',
  cancelButtonText = 'Cancel',
  confirmButtonColor = 'primary',
  loading = false,
  timer = null,
  showCloseButton = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsLeaving(false);
      
      if (timer) {
        const autoCloseTimer = setTimeout(() => {
          handleClose();
        }, timer);
        
        return () => clearTimeout(autoCloseTimer);
      }
    }
  }, [isOpen, timer]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      handleClose();
    }
  };

  if (!isOpen && !isVisible) return null;

  const getIcon = () => {
    const iconClasses = "w-16 h-16 mx-auto mb-4";
    
    switch (icon) {
      case 'success':
        return (
          <div className={`${iconClasses} text-green-500`}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className={`${iconClasses} text-red-500`}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className={`${iconClasses} text-blue-500`}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'question':
        return (
          <div className={`${iconClasses} text-purple-500`}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a1.5 1.5 0 112.12 2.12L10 10.06V11a1 1 0 11-2 0v-1.5a1 1 0 01.5-.866l1.5-.75a.5.5 0 10-.5-.866L8.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
      default:
        return (
          <div className={`${iconClasses} text-yellow-500`}>
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const getConfirmButtonVariant = () => {
    switch (icon) {
      case 'error':
        return 'danger';
      case 'success':
        return 'success';
      case 'info':
        return 'primary';
      case 'warning':
      case 'question':
      default:
        return confirmButtonColor;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${
            isVisible && !isLeaving ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
          onClick={showCancelButton ? handleClose : undefined}
        />

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className={`
          inline-block align-bottom bg-white rounded-2xl px-6 pt-8 pb-6 text-center overflow-hidden shadow-2xl transform transition-all duration-300 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full
          ${isVisible && !isLeaving ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        `}>
          {/* Close button */}
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={loading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Icon */}
          <div className="mb-4">
            {getIcon()}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h2>

          {/* Text */}
          {text && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {text}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant={getConfirmButtonVariant()}
              onClick={handleConfirm}
              loading={loading}
              disabled={loading}
              className="min-w-[100px]"
            >
              {confirmButtonText}
            </Button>
            
            {showCancelButton && (
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="min-w-[100px]"
              >
                {cancelButtonText}
              </Button>
            )}
          </div>

          {/* Timer progress bar */}
          {timer && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-100"
                style={{
                  animation: `progress ${timer}ms linear forwards`
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetAlert;