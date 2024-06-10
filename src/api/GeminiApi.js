import { BACKEND_BASE_URL } from '../utils/constants'

export async function queryGemini(prompt) {
    const body = JSON.stringify({ prompt: prompt })
    const response = await fetch(BACKEND_BASE_URL + 'gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    });
    
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.text();
}