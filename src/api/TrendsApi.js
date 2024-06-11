import { query } from '../utils/requestService'

export async function queryTrends(date, country_code) {
    const body = JSON.stringify({ date: date, country_code: country_code })
    const response = await query('trends', 'POST', body);
    
    return response;
}
