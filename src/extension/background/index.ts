import browser from "webextension-polyfill";
import { getConfig } from '../../config';

const { API_HOST } = getConfig();

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {

        registerWallet().then((data) => {
            browser.storage.local.set({'TOKEN': data.token, 'AUTH_RECOVER_SECRET': data.auth_recover_secret});
        });      
    } 
  });
  
  const registerWallet = async () => {
    try {
      const response = await fetch(API_HOST+'/api/wallet/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: '',
      });
  
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Failed to register wallet:', error);
    }
  };