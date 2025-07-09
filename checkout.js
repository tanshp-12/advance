const PRODUCTS = [
  { id: 'classic', name: 'Classic', price: 99, img: 'can-placeholder.png' },
  { id: 'zero', name: 'Zero Sugar', price: 109, img: 'can-placeholder.png' },
  { id: 'berry', name: 'Berry Blast', price: 119, img: 'can-placeholder.png' }
];
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '{}');
}
function renderOrderSummary() {
  const cart = getCart();
  const summary = document.getElementById('order-summary');
  let total = 0;
  let html = '<ul class="list-group list-group-flush">';
  PRODUCTS.forEach(product => {
    const qty = cart[product.id] || 0;
    if (qty > 0) {
      const subtotal = qty * product.price;
      total += subtotal;
      html += `<li class='list-group-item bg-transparent text-white d-flex justify-content-between align-items-center'>
        <span><img src='${product.img}' alt='${product.name}' style='width:32px;' class='me-2 rounded'>${product.name} x ${qty}</span>
        <span>₹${subtotal}</span>
      </li>`;
    }
  });
  html += '</ul>';
  summary.innerHTML = html;
  document.getElementById('order-total').textContent = `₹${total}`;
}
document.addEventListener('DOMContentLoaded', renderOrderSummary);

document.getElementById('checkout-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const cart = getCart();
  let total = 0;
  PRODUCTS.forEach(p => { total += (cart[p.id] || 0) * p.price; });
  if (total === 0) {
    alert('Your cart is empty!');
    return;
  }
  const order = {
    id: 'ADV' + Math.floor(Math.random()*900000+100000),
    items: Object.entries(cart).filter(([id, qty]) => qty > 0).map(([id, qty]) => {
      const p = PRODUCTS.find(x => x.id === id);
      return { id, name: p.name, price: p.price, qty };
    }),
    total,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    payment: document.getElementById('payment').value,
    date: new Date().toLocaleString(),
    status: 'pending'
  };
  // Store order in Firebase
  database.ref('orders').push(order)
    .then(() => {
      localStorage.setItem('lastOrder', JSON.stringify(order));
      localStorage.removeItem('cart');
      window.location.href = 'order-success.html';
    })
    .catch(err => {
      alert('Order could not be placed. Please try again.');
      console.error(err);
    });
}); 