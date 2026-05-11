import { snackbar } from '@delhivery/tarmac';

export function triggerToast(message: string) {
  snackbar({
    message,
    variant: 'black',
    snackbarStyle: 'filled',
    size: 'sm',
    position: 'bottom',
    duration: 2500,
  });
}

// No longer need a rendered component — TDS SnackbarManager handles it
const Toast = () => null;

export default Toast;
