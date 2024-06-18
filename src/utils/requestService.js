import { BACKEND_BASE_URL } from './constants'

export async function query(endpoint, method, body) {
    const response = await fetch(BACKEND_BASE_URL + endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

async function convertImageUrlToBase64(firebaseStorageUrl) {
    try {
        const response = await fetch(firebaseStorageUrl);
        const blob = await response.blob();

        const reader = new FileReader();
        const base64String = await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        return base64String;
    } catch (error) {
        console.error('Error converting image to base64:', error);
        throw error;
    }
}

