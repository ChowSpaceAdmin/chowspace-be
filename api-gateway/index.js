const express = require('express');

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/hello', (req, res) => {
    res.send('44444'); 
});

app.listen(PORT, () => {
    console.log('api-gateway running');
});
