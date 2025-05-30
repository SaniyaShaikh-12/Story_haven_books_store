const API_URL = 'http://localhost:5000';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(${API_URL}/admin/login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/admin/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
      // Store user data in localStorage
      localStorage.setItem("adminName", username);
      localStorage.setItem("adminImage", "profile-image.jpg"); // Replace with actual image path

      alert("Login successful!");
      window.location.href = "dashboard.html";  // Redirect to dashboard
  } else {
      document.getElementById("password-error").innerText = data.error;
  }
});



document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
      mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
    
    // Category tabs functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const bookCards = document.querySelectorAll('.book-card[data-category]');
    
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Show/hide books based on category
        bookCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Book detail view functionality
    const bookDetailView = document.querySelector('.book-detail');
    const allBookCards = document.querySelectorAll('.book-card');
    
    allBookCards.forEach(card => {
      card.addEventListener('click', function() {
        // Show book detail on mobile
        if (window.innerWidth <= 1200 && bookDetailView) {
          bookDetailView.classList.add('active');
        }
        
        // Here you would typically update the book detail view with the selected book's data
        // For this demo, we'll just highlight the selected book
        allBookCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
    
    // Close book detail view on mobile
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 1200 && 
          bookDetailView && 
          bookDetailView.classList.contains('active') && 
          !bookDetailView.contains(event.target) && 
          !Array.from(allBookCards).some(card => card.contains(event.target))) {
        bookDetailView.classList.remove('active');
      }
    });
    
    // Responsive handling
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && sidebar) {
        sidebar.classList.remove('active');
      }
      
      if (window.innerWidth > 1200 && bookDetailView) {
        bookDetailView.classList.remove('active');
      }
    });
  });