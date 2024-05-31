import React, { useEffect, useState, Dispatch, SetStateAction  } from 'react';
import './index.css';
import { ai } from '../../../api/ai';
import browser from "webextension-polyfill";
import { dataProfile } from '../../../api/dataProfile';
import { getBalance } from '../../../api/balance';
import { Button, CircularProgress } from '@material-ui/core';

function Home({setCurrentPageName}: {setCurrentPageName: Dispatch<SetStateAction<string>>}) {

  const [hasToken, setHasToken] = useState(false);
  const [balance, setBalance] = useState('...');
  const [isCategorizing, setIsCategorizing] = useState<boolean>(false);

  const categorizeData = async () => {
    setIsCategorizing(true);

    const historyItems = await browser.history.search({text: '', maxResults: 500, startTime: 0});
    const titles = [...new Set(historyItems.map((historyItem) => historyItem.title ?? '').filter((title) => title !== ''))];

    if(titles.length > 0) {
      try {
        const resAi = await ai(titles);
        await dataProfile(resAi);

        setCurrentBalance();
      } catch(e) {
        console.log(e);
      }
    }

    setIsCategorizing(false);
  }

  const setTokenFromStorage = async () => {
    let token = await browser.storage.local.get('TOKEN');
    token = token['TOKEN'];

    if(token) {
      setHasToken(true);
    }
  }

  setTokenFromStorage()

  useEffect(() => {

    if(hasToken) {

      setCurrentBalance()
    }
  }, [hasToken])

  async function setCurrentBalance()
  {
    setBalance(await getBalance());
  }

  return (
    <div className='App'>
      { hasToken ?
      <div className='Balance'>
        <h2>Balance: </h2>
        <h1>{balance} <small>XTIMES</small></h1>
        <div className='ActionButtons'>
          <Button
            variant="contained"
            disabled={isCategorizing}
            startIcon={isCategorizing ? <CircularProgress size="1rem" /> : null}
            color="primary"
            onClick={categorizeData}
          >
            {isCategorizing ? 'AI processing...' : 'Earn with Data'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCurrentPageName('withdraw')}
          >
            Withdraw
          </Button>
        </div>
      </div> : <></>}
    </div>
  );
}

export default Home;