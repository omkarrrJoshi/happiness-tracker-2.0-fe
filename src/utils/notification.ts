import Swal from "sweetalert2";

export const showNotification = (
  message: string,
  timer: number = 3000,
  position: "top" | "top-start" | "top-end" | "center" | "center-start" | "center-end" | "bottom" | "bottom-start" | "bottom-end" = "top-end",
  customClass: string = ""
): void => {
  Swal.fire({
    text: message,
    position: position,
    toast: true,
    timer: timer,
    timerProgressBar: true,
    icon: "success",
    showConfirmButton: true,
    customClass: {
      popup: customClass, // Add custom class for the popup
    },
  });
};
