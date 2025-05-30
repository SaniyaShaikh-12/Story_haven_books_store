document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Open menu
    menuToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close menu
    function closeMenuFunction() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    closeMenu.addEventListener('click', closeMenuFunction);
    overlay.addEventListener('click', closeMenuFunction);
    
    // Close menu when clicking on a menu item (for mobile)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                closeMenuFunction();
            }
        });
    });
    
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Dropdown functionality
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle dropdown menu (would be implemented with actual dropdown)
            console.log('Dropdown clicked');
        });
    });
    
    // Create product button
    const createButton = document.querySelector('.create-button');
    
    createButton.addEventListener('click', function() {
        alert('Create new product clicked');
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Reset sidebar and overlay for larger screens
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Simulate loading courses
    function simulateLoading() {
        const courseGrid = document.querySelector('.course-grid');
        courseGrid.style.opacity = '0.6';
        
        setTimeout(() => {
            courseGrid.style.opacity = '1';
        }, 500);
    }
    
    // Call once on page load
    simulateLoading();
});