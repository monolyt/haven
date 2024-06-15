document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();
    const sidebar = document.getElementById('aboutSidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = `-${sidebar.offsetWidth + 1}px`;
    } else {
        sidebar.style.left = '0px';
    }
});

document.getElementById('closeSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('aboutSidebar');
    sidebar.style.left = `-${sidebar.offsetWidth + 1}px`;
});

// Set initial position to fully off-screen without animation
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('aboutSidebar');
    sidebar.style.transition = 'none'; // Disable transition
    sidebar.style.left = `-${sidebar.offsetWidth + 1}px`;
    setTimeout(() => {
        sidebar.style.transition = ''; // Re-enable transition
    }, 20); // Re-enable after a short delay
});
