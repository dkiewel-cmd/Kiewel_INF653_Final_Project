const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(/^\/$|^\/states(\.html)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'statesData.json'));
});

app.get(/.*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));