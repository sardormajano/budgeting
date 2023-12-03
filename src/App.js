import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Sidebar } from './Sidebar';
import { Route, Routes } from 'react-router-dom';

import { AddPayment } from './AddPayment/AddPayment';
import { Periods } from './Periods/Periods';
import { Payments } from './Payments/Payments';
import { CreateTag } from './CreateTag/CreateTag';
import { CreatePeriod } from './CreatePeriod/CreatePeriod';

const drawerWidth = 240;

export const App = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Sidebar drawerWidth={drawerWidth}/>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, display: 'flex', flexDirection: 'column' }}
      >
        <Routes>
          <Route index path="add-payment" element={<AddPayment />} />
          <Route path="periods" element={<Periods />} />
          <Route path="payments" element={<Payments />} />
          <Route path="create-tag" element={<CreateTag />} />
          <Route path="create-period" element={<CreatePeriod />} />
        </Routes>
      </Box>
    </Box>
  );
}