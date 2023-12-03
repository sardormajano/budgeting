import { Button, FormControl, TextField } from '@mui/material';
import React from 'react';

export const CreateTag = () => {
  return <>
    <FormControl fullWidth sx={{ margin: "5px" }}>
        <TextField label="Name" variant="outlined" />
      </FormControl>
      <FormControl fullWidth sx={{ margin: "5px" }}>
        <Button variant="contained">Create Tag</Button>
      </FormControl>
  </>
}