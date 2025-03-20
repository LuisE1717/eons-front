import { toast } from "react-toastify";
export const showToast = (message, type = "info") => {
    switch (type) {
        case "warning":
            toast.warning(message);
            break;
        case "success":
            toast.success(message);
            break;
        case "info":
            toast.info(message);
            break;
        default:
            toast.error(message);
            break;
    }
};