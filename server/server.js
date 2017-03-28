const express = require('express');
const app = express();

app.use(express.static('public'));
app.listen(
  9000,
  () => console.log('Open http://localhost:9000 in his a browser.')
);
