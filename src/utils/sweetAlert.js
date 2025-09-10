import Swal from 'sweetalert2';

// Custom SweetAlert configurations
const swalConfig = {
  confirmButtonColor: '#3b82f6',
  cancelButtonColor: '#ef4444',
  background: '#ffffff',
  color: '#1f2937',
  customClass: {
    popup: 'rounded-lg shadow-xl',
    title: 'text-xl font-semibold',
    content: 'text-gray-600',
    confirmButton: 'px-4 py-2 rounded-md font-medium',
    cancelButton: 'px-4 py-2 rounded-md font-medium'
  }
};

// Success Alert
export const showSuccess = (title, text = '') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'success',
    title,
    text,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  });
};

// Error Alert
export const showError = (title, text = '') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'حسناً'
  });
};

// Warning Alert
export const showWarning = (title, text = '') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'حسناً'
  });
};

// Info Alert
export const showInfo = (title, text = '') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'info',
    title,
    text,
    confirmButtonText: 'حسناً'
  });
};

// Confirmation Dialog
export const showConfirmation = (title, text = '', confirmText = 'نعم', cancelText = 'إلغاء') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  });
};

// Delete Confirmation
export const showDeleteConfirmation = (itemName = 'هذا العنصر') => {
  return Swal.fire({
    ...swalConfig,
    icon: 'warning',
    title: 'هل أنت متأكد؟',
    text: `سيتم حذف ${itemName} نهائياً ولن تتمكن من استرداده!`,
    showCancelButton: true,
    confirmButtonText: 'نعم، احذف!',
    cancelButtonText: 'إلغاء',
    confirmButtonColor: '#ef4444',
    reverseButtons: true
  });
};

// Input Dialog
export const showInputDialog = (title, placeholder = '', inputType = 'text') => {
  return Swal.fire({
    ...swalConfig,
    title,
    input: inputType,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: 'موافق',
    cancelButtonText: 'إلغاء',
    inputValidator: (value) => {
      if (!value) {
        return 'يرجى إدخال قيمة!';
      }
    }
  });
};

// Loading Alert
export const showLoading = (title = 'جاري التحميل...') => {
  return Swal.fire({
    ...swalConfig,
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// Toast Notification
export const showToast = (icon, title, position = 'top-end') => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon,
    title
  });
};

// Custom HTML Alert
export const showCustomHTML = (title, html) => {
  return Swal.fire({
    ...swalConfig,
    title,
    html,
    confirmButtonText: 'حسناً'
  });
};

// Progress Steps
export const showSteps = (steps, currentStep = 0) => {
  return Swal.fire({
    ...swalConfig,
    title: 'خطوات العملية',
    progressSteps: steps.map((_, index) => index + 1),
    currentProgressStep: currentStep,
    confirmButtonText: 'التالي',
    showCancelButton: true,
    cancelButtonText: 'إلغاء'
  });
};

// Image Alert
export const showImageAlert = (title, imageUrl, imageWidth = 400, imageHeight = 200) => {
  return Swal.fire({
    ...swalConfig,
    title,
    imageUrl,
    imageWidth,
    imageHeight,
    imageAlt: title,
    confirmButtonText: 'حسناً'
  });
};

// Auto-close Alert
export const showAutoClose = (title, text, timer = 5000) => {
  let timerInterval;
  return Swal.fire({
    ...swalConfig,
    title,
    text,
    timer,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
        if (b) {
          b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
};

export default {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showConfirmation,
  showDeleteConfirmation,
  showInputDialog,
  showLoading,
  showToast,
  showCustomHTML,
  showSteps,
  showImageAlert,
  showAutoClose
};