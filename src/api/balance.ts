import browser from "webextension-polyfill";
import { getConfig } from '../config'; 

const { API_HOST } = getConfig();

export const getBalance = async (): Promise<string> => {
    let token = await browser.storage.local.get('TOKEN');
    token = token['TOKEN'];

    const response = await fetch(API_HOST+'/api/balance', {
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

    return (await response.json())?.balance ?? '0';
}

export const makeWithdrawal = async (address: string): Promise<string> => {
    let token = await browser.storage.local.get('TOKEN');
    token = token['TOKEN'];

    const response = await fetch(API_HOST+'/api/balance/withdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify({
            address: address
        }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return (await response.json())?.balance ?? '0';
}
