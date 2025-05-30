//User display on the dashboard


document.addEventListener('DOMContentLoaded', function () {
    fetchUsers();
});

function fetchUsers() {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('user-list');
            tableBody.innerHTML = '';

            data.forEach(user => {
                const row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
            
        })
        .catch(error => console.error('Error fetching users:', error));
}

