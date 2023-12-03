const express = require('express');
const app = express();
port = 3000;

app.use(express.static('dist'));
app.listen(port, () => {
  console.log('Budgeting Server running on port', port);
})
