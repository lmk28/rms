const express = require('express');
const app = express();
const port = 3000;

let orders = []; // Speicherung der Bestellungen im Speicher

app.use(express.json());
app.use(express.static('public'));

app.post('/submit-order', (req, res) => {
    const order = req.body.order;
    const totalPrice = req.body.totalPrice;

    orders.push({ items: order, totalPrice });

    console.log('Neue Bestellung erhalten:');
    order.forEach(item => {
        console.log(`Gericht: ${item.item}, Preis: €${item.price.toFixed(2)}, Anmerkung: ${item.note}`);
    });
    console.log(`Gesamtpreis: €${totalPrice.toFixed(2)}`);

    res.json({ message: 'Bestellung erfolgreich empfangen!' });
});

app.get('/get-orders', (req, res) => {
    res.json({ orders });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});