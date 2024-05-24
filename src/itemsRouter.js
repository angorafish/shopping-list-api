const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.json(items);
});

router.post('/', (req, res) => {
    const { name, price } = req.body;
    const newItem = { name, price };
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

router.patch('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item) {
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        res.json({ updated: item });
   } else {
    res.status(404).json({ error: "Item not found" });
   }
});

router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.json({ message: "Deleted" }); 
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

module.exports = router;
