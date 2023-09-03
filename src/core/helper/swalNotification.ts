import Swal from 'sweetalert2';

type CallbackFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

export async function swalNotification<T, Args extends any[]>(
  message: string,
  succesMessage: string | null,
  fn: CallbackFunction<T, Args>,
  ...args: Args
) {
  Swal.fire({
    icon: 'warning',
    title: 'Warning',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Continue',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await fn(...args);
        Swal.fire('Done!', succesMessage ?? 'Request successful', 'success');
      } catch (error: any) {
        console.log('Err: ', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message ?? 'Request failed, please try again',
        });
      }
    }
  });
  return false;
}
