import { BACKEND_BASE_URL } from '../utils/constants'

export async function querySDtxt2img(prompt) {
    let body = JSON.stringify({
        "prompt": "a yellow triangle",
        "batch_size": 1,
        "steps": 1,
        "cfg_scale": 1,
        "width": 64,
        "height": 64,
        "restore_faces": false,
        "tiling": false,  
    })

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