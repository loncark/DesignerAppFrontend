import query from '../utils/requestService'

async function queryTrends(date, country_code) {
    body = JSON.stringify({ date: date, country_code: country_code })

    return await query('trends', 'POST', body);
}
