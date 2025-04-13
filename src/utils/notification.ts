import Swal, { SweetAlertPosition } from "sweetalert2";

export const showNotification = (
  message: string,
  displayIcon: "success" | "error" | "info" | "warning" | "question" = "success",
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
    icon: displayIcon,
    showConfirmButton: true,
    customClass: {
      popup: customClass, // Add custom class for the popup
    },
  });
};

export const showImageNotification = (
  message: string,
  imageUrl: string,
  imageAlt: string = "Image",
  timer: number = 5000,
  position: SweetAlertPosition = "center",
): void => {
  Swal.fire({
    title: "🎉 Great job!",
    text: message,
    imageUrl: imageUrl,
    imageAlt: imageAlt,
    position: position,
    timer: timer,
    showConfirmButton: true,
    timerProgressBar: true,
    customClass: {
      popup: "styled-swal-popup",
      image: "styled-swal-image"
    }
  });
};

