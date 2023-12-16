import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { 
    field: 'id', 
    headerName: 'ID'
  },
  {
    field: 'incoming',
    headerName: 'Incoming',
    valueGetter: (params) => params.row.incoming ? 'YES' : 'NO'
  },
  {
    field: 'amount',
    headerName: 'Amount'
  },
  {
    field: 'period',
    headerName: 'Period'
  },
  {
    field: 'tags',
    headerName: 'Tags',
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (params) => params.row.tags.join(','),
  },
  {
    field: 'notes',
    headerName: 'Notes'
  },
];

const rows = [
  { id: 1, incoming: false, amount: 12.33, period: 'Jan I', tags: ['entertainment'], notes: 'american dream' },
  { id: 2, incoming: false, amount: 2.56, period: 'Jan I', tags: ['food', 'sports'], notes: 'gatorade'  },
  { id: 3, incoming: false, amount: 45.99, period: 'Dec II', tags: ['commute', 'sports'], notes: 'citi bike'  },
  { id: 4, incoming: false, amount: 6.77, period: 'Dec II', tags: ['sports', 'entertainment'], notes: 'ice skating'  },
  { id: 5, incoming: true, amount: 5.55, period: 'Nov I', tags: ['food', 'sports'], notes: 'burger king'  },
  { id: 6, incoming: false, amount: 356.12, period: 'Nov I', tags: ['food', 'sports'], notes: 'protein cocktail'  },
  { id: 7, incoming: false, amount: 543.12, period: 'Dec I', tags: ['entertainment', 'commute'], notes: 'american dream'  },
  { id: 8, incoming: true, amount: 777.33, period: 'Dec I', tags: ['commute'], notes: 'ferry'  },
  { id: 9, incoming: false, amount: 33.44, period: 'Nov II', tags: ['sports'], notes: 'soccer sofive'  },
  { id: 10, incoming: false, amount: 612.66, period: 'Nov II', tags: ['commute'], notes: 'bus NJ Transit'  },
];

export const Payments = () => {
  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}