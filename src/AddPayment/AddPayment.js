import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

const paymentTags = [
  { name: 'Commute' },
  { name: 'Food' }
];

export const AddPayment = () => {
  return (
    <>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <TextField label="Amount" variant="outlined" type="number" />
      </FormControl>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <InputLabel>Direction</InputLabel>
        <Select
          value="Incoming"
          label="Direction"
        >
          <MenuItem value="Incoming">Incoming</MenuItem>
          <MenuItem value="Outgoing">Outgoing</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <InputLabel>Period</InputLabel>
        <Select
          value="december-i"
          label="Period"
        >
          <MenuItem value="december-i">Dec I 2023</MenuItem>
          <MenuItem value="december-ii">Dec II 2023</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <Autocomplete
          multiple
          options={paymentTags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Pick tags"
              placeholder="Payment Tags"
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <TextField label="Note" variant="outlined" />
      </FormControl>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <Button variant="contained">Add payment</Button>
      </FormControl>    
    </>
  )
}