
const cartItems = [];
let cartTotal = 0;

document.querySelectorAll('.select-item').forEach(item => {
  item.addEventListener('change', function () {
    if (this.checked) {
      addToCart(this.dataset.name, parseFloat(this.dataset.price));
    } else {
      removeFromCart(this.dataset.name);
    }
  });
});

function addToCart(name, price) {
  const quantity = parseInt(prompt(`Quantas unidades de ${name} você deseja?`, 1));
  if (quantity > 0) {
    const item = { name, price, quantity };
    cartItems.push(item);
    updateCart();
  }
}

function removeFromCart(name) {
  const index = cartItems.findIndex(item => item.name === name);
  if (index !== -1) {
    cartItems.splice(index, 1);
    updateCart();
  }
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  cartTotal = 0;
  cartItems.forEach(item => {
    cartTotal += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
            <span>${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <div class="item-quantity-controls">
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
            </div>
        `;
    cartItemsContainer.appendChild(cartItem);
  });
  document.getElementById('cart-total').innerText = cartTotal.toFixed(2);
}




function changeQuantity(name, delta) {
  const item = cartItems.find(item => item.name === name);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCart();
    }
  }
}

function addItem() {
  document.querySelectorAll('.select-item').forEach(item => {
    item.checked = false;
  });
  document.getElementById('checkout-section').style.display = 'none';
}

function checkout() {
  if (cartItems.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  document.getElementById('checkout-section').style.display = 'block';
}

function confirmOrder() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;

  if (name && address && payment) {
    const summaryDetails = document.getElementById('summary-details');
    summaryDetails.innerHTML = `
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Endereço:</strong> ${address}</p>
            <p><strong>Pagamento:</strong> ${payment}</p>
            <p><strong>Itens:</strong></p>
            <ul>
                ${cartItems.map(item => `<li>${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            <p><strong>Total:</strong> R$ ${cartTotal.toFixed(2)}</p>
        `;
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('order-summary').style.display = 'block';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}

function cancelOrder() {
  if (confirm('Você tem certeza de que deseja cancelar o pedido?')) {
    cartItems.length = 0;
    cartTotal = 0;
    updateCart();
    document.getElementById('checkout-section').style.display = 'none';
    document.getElementById('checkout-form').reset();
  }
}

function finalizeOrder() {
  alert('Pedido confirmado! Obrigado pela sua compra.');
  cartItems.length = 0;
  cartTotal = 0;
  updateCart();
  document.getElementById('checkout-section').style.display = 'none';
  document.getElementById('checkout-form').reset();
  document.getElementById('order-summary').style.display = 'none';
}

function editOrder() {
  document.getElementById('order-summary').style.display = 'none';
  document.getElementById('checkout-form').style.display = 'block';
}
