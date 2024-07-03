import { query } from '../utils/functions'

export async function queryEtsy(keyword, page) {
    if (!page) {
        page = 1; 
    }
    const body = JSON.stringify({ keyword : keyword, page : page });
    const response = await query('etsy', 'POST', body);
    
    return response;
}