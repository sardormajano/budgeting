import { 
  Alert,
  Autocomplete, 
  Button, 
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { APIs } from '../shared/apis';

export const AddPayment = () => {
  const [amount, setAmount] = useState('0.00');
  const [incoming, setIncoming] = useState(false);
  const [period, setPeriod] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState('');

  const [alerts, setAlerts] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [tags, setTags] = useState([]);

  const handleAddPayment = async () => {
    try {
      const { name, start, end } = periods.find(p => p._id === period);
      const payment = {
        amount, 
        incoming, 
        period: { name, start, end }, 
        tags: selectedTags.map(({ name }) => name), 
        note
      };
  
      const response = await fetch(APIs.Payments, {
        method: 'POST',
        body: JSON.stringify({
          payments: [payment]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const { message } = await response.json();
  
      if (response.status === 200) {
        setAlerts([{ message, severity: 'success' }]);
      } else {
        setAlerts([{ message, severity: 'error' }]);
      }
    } catch (err) {
      setAlerts([{ message: err, severity: 'error' }]);
    } finally {
      setAmount(0);
      setIncoming(false);
      setPeriod('');
      setSelectedTags([]);
      setNote('');
      setTimeout(() => setAlerts([]), 3000);
    }
  }

  useEffect(() => {
    fetch(APIs.PaymentTags).then(async response => {
      const { paymentTags } = await response.json();
      setTags(paymentTags)
    });
  },[]);

  useEffect(() => {
    fetch(APIs.Periods).then(async response => {
      const { periods } = await response.json();
      setPeriods(periods);
    });
  }, []);

  return (
    <>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <TextField
          label='Amount'
          variant='outlined'
          type='number'
          value={amount}
          onBlur={() => setAmount(Number(amount).toFixed(2))}
          onChange={event => setAmount(event.target.value)}
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <FormControlLabel
          control={
            <Checkbox
              onClick={({ target }) => setIncoming(target.checked)}
              checked={incoming}
            />
          }
          label='Incoming'
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <InputLabel>Period</InputLabel>
        <Select
          value={period}
          label='Period'
          onChange={({target}) => setPeriod(target.value)}
          disabled={periods.length === 0}
        >
          {periods.map(({name, _id}) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <Autocomplete
          multiple
          value={selectedTags}
          onChange={(_, newValue) => setSelectedTags(newValue)}
          options={tags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label='Pick tags'
              placeholder='Payment Tags'
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <TextField
          label='Note'
          onChange={({ target }) => setNote(target.value)}
          variant='outlined'
          value={note}
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: '5px' }}>
        <Button 
          onClick={handleAddPayment} 
          variant='contained'
        >Add payment</Button>
      </FormControl>
      { alerts.map(({ severity, message }) => <Alert key={message} severity={severity}>{message}</Alert>) }
    </>
  )
}