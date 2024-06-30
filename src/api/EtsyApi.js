import { query } from '../utils/functions'

export async function queryEtsy(keyword) {
    const body = JSON.stringify({ keyword : keyword })
    const response = await query('etsy', 'POST', body);
    
    return response;
}