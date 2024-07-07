const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let orders = []; // Speicherung der Bestellungen im Speicher

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/submit-order', (req, res) => {
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

app.get('/api/get-orders', (req, res) => {
    res.json({ orders });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});