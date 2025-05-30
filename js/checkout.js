document.getElementById("addressForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Address Submitted Successfully");
});

// Display Order Summary
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = parseFloat(localStorage.getItem('total')) || 0;
    const orderSummaryItems = document.getElementById('order-summary-items');
    const orderSummaryTotal = document.getElementById('order-summary-total');

    if (orderSummaryItems && orderSummaryTotal) {
        orderSummaryItems.innerHTML = ''; // Clear previous items

        cart.forEach(item => {
            orderSummaryItems.innerHTML += `<p>${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</p>`;
        });

        orderSummaryTotal.textContent = `₹${total.toFixed(2)}`; // Corrected string interpolation
    }
}


document.addEventListener('DOMContentLoaded', displayOrderSummary);

// Payment selection
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", function() {
        document.querySelectorAll(".payment-details").forEach(div => div.style.display = "none");
        if (this.value === "Credit/Debit Card") document.getElementById("card-details").style.display = "block";
        if (this.value === "UPI") document.getElementById("upi-details").style.display = "block";
        if (this.value === "Net Banking") document.getElementById("net-banking-details").style.display = "block";
    });
});

// Submit Order
async function submitOrder(event) {
    if (event) event.preventDefault(); // ✅ Prevents form from refreshing

    let orderDetails = {
        fullName: document.getElementById("fullname").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("addressLine1").value + ", " + document.getElementById("addressLine2").value,
        email: document.getElementById("email").value,
        paymentMethod: document.querySelector('input[name="payment"]:checked')?.value,
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        total: parseFloat(localStorage.getItem("total")) || 0,
    };

    if (!orderDetails.paymentMethod) {
        alert('Please select a payment method!');
        return;
    }

    if (orderDetails.cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        let response = await fetch("http://localhost:5001/place-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderDetails),
        });
    
        // Check if the response is JSON
        if (response.ok) {
            const contentType = response.headers.get("Content-Type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                console.log("Parsed Response:", data);
            } else {
                let textResponse = await response.text();
                console.log("Raw Response:", textResponse);
                data = { message: textResponse }; // Assuming the response was not JSON
            }
    
            alert("Order placed successfully!");
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            window.location.href = "index.html";
        } else {
            throw new Error("Order failed");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    }
    
}
