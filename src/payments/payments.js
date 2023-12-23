import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { APIs } from '../shared/apis';
import { DatePicker } from '@mui/x-date-pickers';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const columns = [
  {
    field: 'incoming',
    headerName: 'Direction',
    renderCell: (params) => params.row.incoming ? <ArrowUpward color='success'/> : <ArrowDownward color='error'/>,
    flex: 1
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1
  },
  {
    field: 'period',
    headerName: 'Period', 
    valueGetter: (params) => params.row.period.name,
    flex: 1
  },
  {
    field: 'tags',
    headerName: 'Tags',
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (params) => params.row.tags.join(','),
    flex: 1
  },
  {
    field: 'note',
    headerName: 'Note',
    flex: 1
  },
];

export const Payments = () => {
  const [incoming, setIncoming] = useState();
  const [minAmount, setMinAmount] = useState();
  const [maxAmount, setMaxAmount] = useState();
  const [period, setPeriod] = useState('');
  const [periodFrom, setPeriodFrom] = useState();
  const [periodTo, setPeriodTo] = useState();
  const [selectedTags, setSelectedTags] = useState();

  const [periods, setPeriods] = useState([]);
  const [tags, setTags] = useState([]);
  const [payments, setPayments] = useState([]);
  const [initialPayments, setInitialPayments] = useState([]);

  useEffect(() => {
    fetch(APIs.Periods).then(async response => {
      const { periods } = await response.json();
      setPeriods(periods);
    });
  }, []);
  useEffect(() => {
    fetch(APIs.PaymentTags).then(async response => {
      const { paymentTags } = await response.json();
      setTags(paymentTags)
    });
  },[]);
  useEffect(() => {
    fetch(APIs.Payments).then(async response => {
      const { payments } = await response.json();
      const mappedPayments = payments.map(p => ({ id: p._id, ...p }))
      setInitialPayments([...mappedPayments])
      setPayments(mappedPayments);
    });
  }, []);
  useEffect(() => {
    const filteredPayments = initialPayments.filter(payment => {
      const meetsMinAmount = minAmount !== undefined ? Number(minAmount) <= Number(payment.amount) : true;
      const meetsMaxAmount = maxAmount !== undefined ? Number(maxAmount) >= Number(payment.amount) : true;
      const meetsIncoming = incoming !== undefined ? incoming === payment.incoming : true;
      const meetsPeriodFrom = periodFrom !== undefined ? new Date(periodFrom) < new Date(payment.createdAt) : true;
      const meetsPeriodTo = periodTo !== undefined ? new Date(periodTo) > new Date(payment.createdAt) : true;

      let meetsPeriod = true;
      if (period) {
        const periodObject = periods.find(p => p._id === period);
        meetsPeriod = payment.period.name === periodObject.name;
      }

      let meetsTags = true;
      if (selectedTags?.length > 0) {
        meetsTags = selectedTags.every(t => payment.tags.includes(t.name));
      }
      
      return [
        meetsMinAmount, 
        meetsMaxAmount, 
        meetsIncoming, 
        meetsPeriod,
        meetsTags,
        meetsPeriodFrom, 
        meetsPeriodTo
      ].every(Boolean);
    });
    setPayments(filteredPayments);
  }, [incoming, minAmount, maxAmount, period, selectedTags, periodFrom, periodTo]);
  
  const handleResetFilters = () => {
    setIncoming(undefined);
    setMinAmount(undefined);
    setMaxAmount(undefined);
    setPeriod(undefined);
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl sx={{ flex: '1', margin: '3px' }}>
          <FormControlLabel
            control={
              <Checkbox
                onClick={({ target }) => setIncoming(target.checked)}
                checked={incoming}
                indeterminate={incoming == undefined}
              />
            }
            label='Incoming'
          />
        </FormControl>
        <FormControl fullWidth sx={{ flex: '1', margin: '3px' }}>
          <TextField
            label='Min Amt'
            variant='outlined'
            type='number'
            value={minAmount}
            onBlur={() => setMinAmount(Number(minAmount).toFixed(2))}
            onChange={event => setMinAmount(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ flex: '1', margin: '3px' }}>
          <TextField
            label='Max Amt'
            variant='outlined'
            type='number'
            value={maxAmount}
            onBlur={() => setMaxAmount(Number(maxAmount).toFixed(2))}
            onChange={event => setMaxAmount(event.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ flex: '1', margin: '3px' }}>
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
        <DatePicker
          label='From' 
          sx={{ flex: '1', margin: '3px' }} 
          onChange={periodFrom => setPeriodFrom(periodFrom)} 
          value={periodFrom}
        />
        <DatePicker 
          label='To' 
          sx={{ flex: '1', margin: '3px' }} 
          onChange={periodTo => setPeriodTo(periodTo)} 
          value={periodTo} 
        />
        <FormControl sx={{ flex: '1', margin: '3px' }}>
          <Button 
            onClick={handleResetFilters} 
          >Reset Filters</Button>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <FormControl sx={{ flex: '1' }}>
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
      </Box>
      <Box sx={{ height: '800px', width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={payments}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}