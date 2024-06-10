import { query } from '../utils/requestService';

export async function queryTESS(prompt) {
    const body = JSON.stringify({ prompt });
    const response = await query('tess', 'POST', body);
    
    return response;  
}
