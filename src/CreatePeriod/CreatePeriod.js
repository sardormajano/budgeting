import React from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export const CreatePeriod = () => {
  return <>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <TextField label="Name" variant="outlined" />
      </FormControl>
      <DatePicker label="Starts on" sx={{ margin: "5px" }}/>
      <DatePicker label="Ends on (including end date)" sx={{ margin: "5px" }}/>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <Button variant="contained">Create Period</Button>
      </FormControl>
  </>
}