const orders = []; // Speicherung der Bestellungen im Speicher

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { order, totalPrice } = req.body;

        orders.push({ items: order, totalPrice });

        console.log('Neue Bestellung erhalten:');
        order.forEach(item => {
            console.log(`Gericht: ${item.item}, Preis: €${item.price.toFixed(2)}, Anmerkung: ${item.note}`);
        });
        console.log(`Gesamtpreis: €${totalPrice.toFixed(2)}`);

        res.status(200).json({ message: 'Bestellung erfolgreich empfangen!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
