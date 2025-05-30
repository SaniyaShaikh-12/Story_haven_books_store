let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function addToCart(name, price) {
    const quantity = parseInt(document.getElementById('quantity').value);
    const imageUrl = document.querySelector('.main_image img').src; // Get the image URL
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity, imageUrl });
    }
    
    total += price * quantity;
    updateCart();
    alert(`${quantity} ${name} added to cart!`);
}


function removeFromCart(index) {
    const item = cart[index];
    total -= item.price * item.quantity;
    cart.splice(index, 1);

    // If the cart is empty, reset total to 0
    if (cart.length === 0) {
        total = 0;
    }

    updateCart();
}

function updateQuantity(index, change) {
    const item = cart[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity > 0) {
        total += item.price * change;
        item.quantity = newQuantity;
    } else {
        removeFromCart(index);
    }
    
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toString());

    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                    <span>${item.name} - ₹${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        // Update cart total or show ₹0.00 if cart is empty
        cartTotal.textContent = cart.length > 0 ? total.toFixed(2) : '₹0.00';
    }
}


// Call updateCart on page load to reflect the current cart state
document.addEventListener('DOMContentLoaded', updateCart);
