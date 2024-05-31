import browser from "webextension-polyfill";
import { getConfig } from '../config'; 
const { API_HOST } = getConfig();

export const dataProfile = async (profile: object) => {
    let token = await browser.storage.local.get('TOKEN');
    token = token['TOKEN'];

    const response = await fetch(API_HOST+'/api/data/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(profile),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

export const getProfile = async (): Promise<string> => {
    let token = await browser.storage.local.get('TOKEN');
    token = token['TOKEN'];

    const response = await fetch(API_HOST+'/api/data/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return (await response.json())?.profile;
}
