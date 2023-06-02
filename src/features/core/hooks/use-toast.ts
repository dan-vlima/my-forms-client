import { useToasts } from "react-toast-notifications";

export type ToastType = {
  message: string;
};
export function useToast() {
  const { addToast } = useToasts();
  function showError({ message }: ToastType): void {
    const printableText =
      typeof message === "string" ? message : JSON.stringify(message);
    return addToast(printableText, {
      appearance: "error",
      autoDismiss: true,
    });
  }
  function showSuccess({ message }: ToastType): void {
    const printableText =
      typeof message === "string" ? message : JSON.stringify(message);
    return addToast(printableText, {
      appearance: "success",
      autoDismiss: true,
    });
  }
  function showWarning({ message }: ToastType): void {
    const printableText =
      typeof message === "string" ? message : JSON.stringify(message);
    return addToast(printableText, {
      appearance: "warning",
      autoDismiss: true,
    });
  }
  return { showError, showSuccess, showWarning };
}
