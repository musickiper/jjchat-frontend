import storage from "./Firebase";
import {toast} from "react-toastify";

export const imageUpload = async (image) => {
    try {
        const curTime = Date.now();
        const imageName = `${curTime}_${image.name}`;
        await storage.ref(`images/${imageName}`).put(image);
        const imageUrl = await storage.ref(`images/${imageName}`).getDownloadURL();
        toast.success("Upload Image success");
        return imageUrl;
    } catch (e) {
        console.error(e);
        toast.error("Upload Image failed");
    }
};
