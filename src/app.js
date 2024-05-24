const express = require('express');
const app = express();
const itemsRouter = require('./itemsRouter')

app.use(express.json());
app.use('/items', itemsRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;