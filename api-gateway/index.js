const express = require('express');

const PORT = 8000;

const app = express();

app.use(express.json());

// AUTHENTICATION SERVICE
app.post('/authentication/login', (req, res) => {
    res.send({
        success: true,
        access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA',
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA',
        id: '199c4998-394a-4c95-89f2-76df97b6af15',
        firstName: 'Jason',
        lastName: 'Statham',
        profileImage: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        isVerified: false
    });
});

app.post('/authentication/refresh', (req, res) => {
    res.send({
        success: true,
        access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA',
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA'
    });
});

app.get('/user/self', (req, res) => {
    res.send({
        success: true,
        id: '199c4998-394a-4c95-89f2-76df97b6af15',
        firstName: 'Jason',
        lastName: 'Statham',
        profileImage: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        telephones: ["089-041-6252", "029340143222"],
        isVerified: false
    });
});

app.get('/user/:id', (req, res) => {
    res.send({
        success: true,
        id: '199c4998-394a-4c95-89f2-76df97b6af15',
        firstName: 'Jason',
        lastName: 'Statham',
        profileImage: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        telephones: ["089-041-6252", "029340143222"]
    });
});

app.post('/user', (req, res) => {
    res.send({
        success: true,
        access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA',
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOTljNDk5OC0zOTRhLTRjOTUtODlmMi03NmRmOTdiNmFmMTUiLCJleHAiOiIxNTUyNjA0NDAwIn0.-9L7Rd6qhdhM5iCuwf3E3zbE0Q8Q0yZAxxFqXlgtycA',
        id: '199c4998-394a-4c95-89f2-76df97b6af15',
        firstName: 'Jason',
        lastName: 'Statham',
        profileImage: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        isVerified: false
    });
});

app.patch('/user', (req, res) => {
    res.send({
        success: true,
        firstName: 'Jason',
        lastName: 'Statham',
        profileImage: 'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',
        telephones: ["089-041-6252", "029340143222"]
    });
});

app.post('/user/changePassword', (req, res) => {
    res.send({
        success: true
    });
});

// SPACE MANAGEMENT SERVICE

app.listen(PORT);
