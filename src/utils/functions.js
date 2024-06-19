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

export function base64ToBlob(base64) {
    let byteChars = atob(base64);
    let byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: "image/png"});
}

export function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(blob);
    });
}