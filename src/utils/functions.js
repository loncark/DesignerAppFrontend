import { BACKEND_BASE_URL, COUNTRY_CODES, TRADEMARK_FILTERS } from './constants'

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


//StableDiffusionScreen.vue

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

//TrendScreen.vue

export const convertStringToDate = (dateString) => {
    const [year, month, day] = dateString.split('/');
  
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return date;
  }
  
export const convertDateToString = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Invalid Date object: ' + date);
    }
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  }

export const formatDateForBackend = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

export const insertSlashesIntoDateString = (dateString) => {
    if (dateString.length !== 8) {
        throw new Error("Invalid date string format. Expected 8 digits.");
    }

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${year}/${month}/${day}`;
}

// EtsyScreen.vue

export const orderBy = (products, order) => {
    switch (order) {
        case 'Price ascending':
            return [...products].sort((a, b) => a.price.originalPrice - b.price.originalPrice);
        case 'Price descending':
            return [...products].sort((a, b) => b.price.originalPrice - a.price.originalPrice);
        case 'Name A-Z':
            return [...products].sort((a, b) => a.title.localeCompare(b.title));
        case 'Name Z-A':
            return [...products].sort((a, b) => b.title.localeCompare(a.title));
        case 'Rating ascending':
            return [...products].sort((a, b) => a.rating - b.rating);
        case 'Rating descending':
            return [...products].sort((a, b) => b.rating - a.rating);
        case 'Bestsellers only':
            return products.filter(product => product.bestseller === true);
        default:
            return products;
    }
}