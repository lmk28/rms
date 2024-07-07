let order = [];
let totalPrice = 0;

function addItem(item, price, noteId) {
    const note = document.getElementById(noteId).value;
    order.push({ item, price, note });
    updateOrderSummary();
    document.getElementById(noteId).value = ''; // Leert das Anmerkungsfeld nach dem Hinzufügen
}

function updateOrderSummary() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    totalPrice = 0;

    order.forEach(orderItem => {
        const li = document.createElement('li');
        li.textContent = `${orderItem.item} - €${orderItem.price.toFixed(2)}${orderItem.note ? ` (${orderItem.note})` : ''}`;
        orderList.appendChild(li);
        totalPrice += orderItem.price;
    });

    document.getElementById('total-price').textContent = `Gesamt: €${totalPrice.toFixed(2)}`;
}

function clearOrder() {
    order = [];
    updateOrderSummary();
}

function submitOrder() {
    fetch('https://rms-clover.vercel.app/api/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order, totalPrice })
    })
    .then(response => response.json())
    .then(data => {
        alert('Bestellung erfolgreich abgeschickt!');
        clearOrder();
        fetchOrders();
    })
    .catch(error => {
        alert('Fehler beim Abschicken der Bestellung');
        console.error('Error:', error);
    });
}

function fetchOrders() {
    fetch('https://rms-clover.vercel.app/api/get-orders')
    .then(response => response.json())
    .then(data => {
        const allOrdersList = document.getElementById('all-orders-list');
        allOrdersList.innerHTML = '';

        data.orders.forEach((order, index) => {
            const li = document.createElement('li');
            li.textContent = `Bestellung #${index + 1}: ${order.items.map(item => `${item.item} (€${item.price.toFixed(2)}${item.note ? `, ${item.note}` : ''})`).join(', ')} - Gesamt: €${order.totalPrice.toFixed(2)}`;
            allOrdersList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabName === 'Bestellübersicht') {
        fetchOrders();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('tablink')[0].click();
});
