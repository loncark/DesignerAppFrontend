import { BACKEND_BASE_URL } from '../utils/constants'
import { query } from '../utils/requestService';
import { base64ToBlob } from '../utils/functions';

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

export const getAllDesignsFromStorage = async () => {
    return await query('db/allDesigns', 'GET', null);
}

export const uploadDesignToRealtimeDb = async (design) => {
    try {
        let response = await fetch(BACKEND_BASE_URL + 'db/saveDesign', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(design)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

