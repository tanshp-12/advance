// Product data (should match products.html)
const PRODUCTS = [
  { id: 'classic', name: 'Classic', price: 99, img: 'can-placeholder.png' },
  { id: 'zero', name: 'Zero Sugar', price: 109, img: 'can-placeholder.png' },
  { id: 'berry', name: 'Berry Blast', price: 119, img: 'can-placeholder.png' }
];

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '{}');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function renderCart() {
  const cart = getCart();
  const tbody = document.getElementById('cart-items');
  tbody.innerHTML = '';
  let total = 0;
  PRODUCTS.forEach(product => {
    const qty = cart[product.id] || 0;
    if (qty > 0) {
      const subtotal = qty * product.price;
      total += subtotal;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${product.img}" alt="${product.name}" style="width:48px;" class="me-2 rounded">${product.name}</td>
        <td>₹${product.price}</td>
        <td>
          <div class="d-flex align-items-center justify-content-center">
            <button class="btn btn-sm btn-outline-light me-2" onclick="updateQty('${product.id}', -1)"><i class="bi bi-dash"></i></button>
            <span class="mx-2">${qty}</span>
            <button class="btn btn-sm btn-outline-light ms-2" onclick="updateQty('${product.id}', 1)"><i class="bi bi-plus"></i></button>
          </div>
        </td>
        <td>₹${subtotal}</td>
        <td><button class="btn btn-sm btn-outline-danger" onclick="removeItem('${product.id}')"><i class="bi bi-trash"></i></button></td>
      `;
      tbody.appendChild(tr);
    }
  });
  document.getElementById('cart-total').textContent = `₹${total}`;
  document.getElementById('place-order-btn').classList.toggle('disabled', total === 0);
}
window.updateQty = function(id, delta) {
  const cart = getCart();
  cart[id] = Math.max(1, (cart[id] || 1) + delta);
  setCart(cart);
  renderCart();
};
window.removeItem = function(id) {
  const cart = getCart();
  delete cart[id];
  setCart(cart);
  renderCart();
};
document.addEventListener('DOMContentLoaded', renderCart); 