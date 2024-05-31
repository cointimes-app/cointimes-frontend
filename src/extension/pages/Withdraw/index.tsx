import React, {useState } from 'react';
import './index.css';
import {  makeWithdrawal } from '../../../api/balance';
import { TextField, Button, Container, Typography, CircularProgress } from '@material-ui/core';

function Withdraw() {

  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const withdraw = async () => {
    setLoading(true);
    await makeWithdrawal(walletAddress);
    setLoading(false);
  }
    return (
      <Container className='container'>
        <Typography variant="h6">Withdraw</Typography>
        <TextField
          className='textField'
          value={walletAddress}
          onChange={e => setWalletAddress(e.target.value)}
          label="Endereço da Carteira"
          variant="outlined"
        />
        <Button
          variant="contained"
          className='button'
          disabled={loading}
          startIcon={loading ? <CircularProgress size="1rem" /> : null}
          color="primary"
          onClick={withdraw}
        >
          {loading ? 'Loading...' : 'Withdraw'}
        </Button>
      </Container>
    );
}

export default Withdraw;