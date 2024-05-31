import React, { useEffect, useState } from 'react';
import browser from "webextension-polyfill";
import './index.css';
import { Paper, Typography } from '@mui/material';

function Config() {
    const [authRecoverSecret, setAuthRecoverSecretData] = useState('...');

    useEffect( ()  =>  {
        getAuthSecretRecover();

    }, []);

    async function getAuthSecretRecover()  {
        let authRecoverSecretData = await browser.storage.local.get('AUTH_RECOVER_SECRET');
        setAuthRecoverSecretData(authRecoverSecretData.AUTH_RECOVER_SECRET);
    }

    return (
        <div className="root">
            <Paper className="paper" elevation={3}>
                <Typography variant="h6" gutterBottom>
                    Recovery secret code
                </Typography>
                <pre className="pre">{authRecoverSecret}</pre>
            </Paper>
        </div>
    );
}

export default Config;
