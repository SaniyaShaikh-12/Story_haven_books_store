document.addEventListener("DOMContentLoaded", () => {
    fetchBooks(); // Load books on page load
});

document.getElementById("product-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const productData = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        original_price: document.getElementById("original_price").value,
        image_url: document.getElementById("image_url").value,
        rating: document.getElementById("rating").value
    };

    fetch("http://localhost:5000/api/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Book added successfully!");
        document.getElementById("product-form").reset();
        fetchBooks(); // Refresh book list
    })
    .catch(error => console.error("Error adding book:", error));
});

// Fetch books from backend and display in table
function fetchBooks() {
    fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById("book-list");
            bookList.innerHTML = "";

            data.forEach(book => {
                const row = `
                    <tr>
                        <td>${book.title}</td>
                        <td>$${book.price}</td>
                        <td>$${book.original_price}</td>
                        <td><img src="${book.image_url}" alt="Book Cover"></td>
                        <td>${book.rating}</td>
                        <td><button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button></td>
                    </tr>
                `;
                bookList.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}

// Delete a book from the database
function deleteBook(id) {
    fetch(`http://localhost:5000/api/delete-product/${id}`, { // Use backticks here
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Use backticks here
        }
        return response.json();
    })
    .then(data => {
        console.log("Book deleted:", data);
        fetchBooks(); // Refresh the book list
    })
    .catch(error => console.error("Error deleting book:", error));
}
