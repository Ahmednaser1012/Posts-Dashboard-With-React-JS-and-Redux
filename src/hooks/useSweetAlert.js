import { useState } from 'react';

const useSweetAlert = () => {
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
    onConfirm: null,
    onClose: null,
    loading: false,
    timer: null
  });

  const showAlert = (config) => {
    return new Promise((resolve) => {
      setAlertConfig({
        ...config,
        isOpen: true,
        onConfirm: () => {
          if (config.onConfirm) {
            config.onConfirm();
          }
          resolve(true);
          closeAlert();
        },
        onClose: () => {
          if (config.onClose) {
            config.onClose();
          }
          resolve(false);
          closeAlert();
        }
      });
    });
  };

  const closeAlert = () => {
    setAlertConfig(prev => ({ ...prev, isOpen: false }));
  };

  const setLoading = (loading) => {
    setAlertConfig(prev => ({ ...prev, loading }));
  };

  // Predefined alert types
  const fire = {
    success: (title, text, options = {}) => showAlert({
      title,
      text,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
      ...options
    }),

    error: (title, text, options = {}) => showAlert({
      title,
      text,
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'OK',
      ...options
    }),

    warning: (title, text, options = {}) => showAlert({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      ...options
    }),

    info: (title, text, options = {}) => showAlert({
      title,
      text,
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK',
      ...options
    }),

    question: (title, text, options = {}) => showAlert({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      ...options
    }),

    confirm: (title, text, options = {}) => showAlert({
      title: title || 'Are you sure?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      ...options
    })
  };

  return {
    alertConfig,
    showAlert,
    closeAlert,
    setLoading,
    fire
  };
};

export default useSweetAlert;