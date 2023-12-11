import React, { useState } from 'react';
import { Alert, Button, FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { APIs } from '../shared/apis';

export const CreatePeriod = () => {
  const [name, setName] = useState('');
  const [start, setStart] = useState(Date.now());
  const [end, setEnd] = useState(Date.now());
  const [alerts, setAlerts] = useState([]);

  const handleCreatePeriod = async () => {
    try {
      const response = await fetch(APIs.Periods, {
        method: "POST", 
        body: JSON.stringify({
          periods: [{ name, start, end }]
        }), 
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const { message } = await response.json();

      if (response.status === 200) {
        setAlerts([{ message, severity: "success" }]);
      } else {
        setAlerts([{ message, severity: "error" }]);
      }
    } catch (err) {
      setAlerts([{ message: err, severity: "error" }]);
    } finally {
      setName('');
      setStart(null);
      setEnd(null);
      setTimeout(() => setAlerts([]), 3000);
    }
  }

  return <>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <TextField 
          label="Name" 
          variant="outlined" 
          onChange={({target}) => setName(target.value)} 
          value={name} 
        />
      </FormControl>
      <DatePicker 
        label="Starts on" 
        sx={{ margin: "5px" }} 
        onChange={start => setStart(start)} 
        value={start}
      />
      <DatePicker 
        label="Ends on (including end date)" 
        sx={{ margin: "5px" }} 
        onChange={end => setEnd(end)} 
        value={end} 
      />
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <Button 
          onClick={() => handleCreatePeriod()} 
          variant="contained"
        >
          Create Period
        </Button>
      </FormControl>
      { alerts.map(({ severity, message }) => <Alert key={message} severity={severity}>{message}</Alert>) }
  </>
}