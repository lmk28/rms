const orders = []; // Speicherung der Bestellungen im Speicher

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ orders });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
