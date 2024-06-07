import query from '../utils/requestService'

async function queryTESS(prompt) {
    body = JSON.stringify({ prompt: prompt })

    return await query('tess', 'POST', body);
}
