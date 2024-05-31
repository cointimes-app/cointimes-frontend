import { getConfig } from '../config'; 
const { API_HOST } = getConfig();

export const ai = async (titles: string[]) => {
    const response = await fetch(API_HOST+'/api/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            titles: titles
        }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}
