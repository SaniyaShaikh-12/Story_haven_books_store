document.addEventListener("DOMContentLoaded", function() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let container = document.getElementById("wishlist-container");

    if (wishlist.length === 0) {
        container.innerHTML = "<p>Your Wishlist is empty.</p>";
    } else {
        wishlist.forEach((item) => {
            let productDiv = document.createElement("div");
            productDiv.innerHTML = `
                <div class="wishlist-item">
                    <img src="${item.img}" alt="${item.name}" style="width: 100px;">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}/-</p>
                    <button onclick="removeFromWishlist('${item.name}')">Remove</button>
                </div>
            `;
            container.appendChild(productDiv);
        });
    }
});

function removeFromWishlist(name) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.name !== name);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    location.reload(); // Refresh page to update wishlist
}

function addToWishlist(name, img, price) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let existingItem = wishlist.find(item => item.name === name);
    if (!existingItem) {
        wishlist.push({ name, img, price });  // Keep original img path
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to Wishlist!");
    } else {
        alert("This item is already in your Wishlist!");
    }

    window.location.href = "wishlist.html";  
}


