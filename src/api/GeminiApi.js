import { query } from '../utils/requestService'

export async function queryGemini(prompt) {
    const body = JSON.stringify({ prompt: prompt })

    return await query('gemini', 'POST', body);
}
