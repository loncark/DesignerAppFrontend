import { BACKEND_BASE_URL } from '../utils/constants'
import { query } from '../utils/requestService';

export const uploadImgToFirebaseStorage = async (base64String) => {
    let formData = new FormData();
    formData.append("image", base64ToBlob(base64String), "image.png");

    try {
        let response = await fetch(BACKEND_BASE_URL + 'storage', {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);

        if (data.url) {
            return data.url;
        } else {
            throw new Error('No URL returned from the backend');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function base64ToBlob(base64) {
    let byteChars = atob(base64);
    let byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: "image/png"});
}

export const getAllDesignsFromStorage = async () => {
    return await query('db/allDesigns', 'GET', null);
}