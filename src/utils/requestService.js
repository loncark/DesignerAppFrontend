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
