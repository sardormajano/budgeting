import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AddCard, CalendarMonth, CurrencyExchange, DateRange, LocalOffer, PointOfSale } from '@mui/icons-material';
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const drawerWidth = 240;

const paymentTags = [
  { name: 'Commute' },
  { name: 'Food' }
]

export const App = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddCard /> 
            </ListItemIcon>
            <ListItemText primary="Make Payment" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonth /> 
            </ListItemIcon>
            <ListItemText primary="Periods" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PointOfSale /> 
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DateRange /> 
            </ListItemIcon>
            <ListItemText primary="Create Period" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocalOffer /> 
            </ListItemIcon>
            <ListItemText primary="Create Tag" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CurrencyExchange /> 
            </ListItemIcon>
            <ListItemText primary="Create Currency" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Budgeting
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <FormControl fullWidth sx={{ margin: "5px" }}>
            <TextField label="Amount" variant="outlined" type="number" />
          </FormControl>
          <FormControl fullWidth sx={{ margin: "5px" }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value="Dollar"
              label="Currency"
            >
              <MenuItem value="Dollar">$</MenuItem>
            </Select>
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
            <Button variant="contained">Submit</Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}