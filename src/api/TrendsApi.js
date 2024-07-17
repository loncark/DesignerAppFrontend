import { query } from '../utils/functions'

export async function queryTrends(date, country_code) {
    const body = JSON.stringify({ date: date, country_code: country_code })
    const response = await query('trends', 'POST', body);
    
    return response;
}

export async function queryRelatedQueries(keyword) {
    const body = JSON.stringify({ keyword: keyword })
    const response = await query('relatedQueries', 'POST', body);
    
    return response;
}

export async function queryInterestByRegion(keyword) {
    const body = JSON.stringify({ keyword: keyword })
    const response = await query('interestByRegion', 'POST', body);
    
    return response;
}

export async function queryInterestOverTime(keyword) {
    const body = JSON.stringify({ keyword: keyword })
    const response = await query('chart', 'POST', body);
    
    return response;
}