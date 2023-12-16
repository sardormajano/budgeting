import { Alert, Button, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import { APIs } from '../shared/apis';
import { SettingsSystemDaydreamTwoTone } from '@mui/icons-material';

export const CreateTag = () => {
  const [name, setName] = useState('');
  const [alerts, setAlerts] = useState([]);

  const handleCreateTag = async () => {
    try {
      const response = await fetch(APIs.PaymentTags, {
        method: 'POST', 
        body: JSON.stringify({
          paymentTags: [{ name }]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { message } = await response.json();

      if (response.status === 200) {
        setAlerts([{ message, severity: 'success'} ]);
      } else {
        setAlerts([{ message, severity: 'error' }]);
      }
    } catch (err) {
      setAlerts([{ message, severity: 'error' }]);
    } finally {
      setName('');
      setTimeout(() => setAlerts([]), 3000);
    }
  }

  return <>
    <FormControl fullWidth sx={{ margin: '5px' }}>
        <TextField 
          label='Name' 
          variant='outlined'
          onChange={({target}) => setName(target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <Button 
          variant='contained'
          onClick={() => handleCreateTag()}
        >Create Tag</Button>
      </FormControl>
      { alerts.map(({ severity, message }) => <Alert key={message} severity={severity}>{message}</Alert>) }
  </>
}