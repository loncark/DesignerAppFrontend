import { query } from '../utils/functions';

export async function queryTESS(prompt) {
    const body = JSON.stringify({ prompt });
    const response = await query('tess', 'POST', body);
    
    return response;  
}
