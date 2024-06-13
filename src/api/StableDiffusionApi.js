import { BACKEND_BASE_URL } from '../utils/constants'

export async function querySDtxt2img(params) {
    let body = JSON.stringify(params)

    const response = await fetch(BACKEND_BASE_URL + 'sd/txt2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function querySDimg2img(params) {
    let body = JSON.stringify(params)

    const response = await fetch(BACKEND_BASE_URL + 'sd/img2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}