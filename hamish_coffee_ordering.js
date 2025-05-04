const form = document.getElementById('order-form');
const orderList = document.getElementById('order-list');
const loadBtn = document.getElementById('load-orders');

// Save order to localStorage
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name');
  const coffee = formData.get('coffee');
  const size = formData.get('size');
  const addons = formData.getAll('addons');

  const order = {
    name,
    coffee,
    size,
    addons,
    timestamp: new Date().toISOString()
  };

  // Get current orders from localStorage
  const orders = JSON.parse(localStorage.getItem('coffeeOrders') || '[]');
  orders.push(order);
  localStorage.setItem('coffeeOrders', JSON.stringify(orders));

  alert('Order saved!');
  form.reset();
});

// Load orders from localStorage
loadBtn.addEventListener('click', () => {
  const orders = JSON.parse(localStorage.getItem('coffeeOrders') || '[]');

  orderList.innerHTML = '';

  if (orders.length === 0) {
    orderList.innerHTML = '<p>No orders yet.</p>';
    return;
  }

  orders.forEach((order, index) => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order';

    orderDiv.innerHTML = `
      <h4>Order #${index + 1}</h4>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Coffee:</strong> ${order.coffee}</p>
      <p><strong>Size:</strong> ${order.size}</p>
      <p><strong>Add-ons:</strong> ${order.addons.join(', ') || 'None'}</p>
      <p><small>${new Date(order.timestamp).toLocaleString()}</small></p>
      <hr/>
    `;

    orderList.appendChild(orderDiv);
  });
});

const load_orders_btn = document.getElementById('load-orders');

load_orders_btn.addEventListener('click', load_orders);

function load_orders() {
    alert('Loading orders!');
}
