// Order History Js

document.addEventListener('DOMContentLoaded', function () {
  fetchOrders();
});

function fetchOrders() {
  fetch('http://localhost:3000/api/orders')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.getElementById('order-list'); // Match HTML ID

          if (!tableBody) {
              console.error("Error: 'order-list' element not found!");
              return;
          }

          tableBody.innerHTML = ''; // Clear previous data

          data.forEach(order => {
              const row = `<tr>
                  <td>${order.id}</td>
                  <td>${order.full_name}</td>
                  <td>${order.mobile}</td>
                  <td>${order.address}</td>
                  <td>${order.payment_method}</td>
                  <td>${order.total}</td>
                  <td>${order.created_at}</td>
              </tr>`;
              tableBody.innerHTML += row;
          });
      })
      .catch(error => console.error('Error fetching orders:', error));
}
