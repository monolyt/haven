document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('aboutSidebar').style.left = '1px';
});

document.getElementById('closeSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('aboutSidebar');
    sidebar.style.left = `-${sidebar.offsetWidth + 1}px`;
});

// Set initial position to fully off-screen
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('aboutSidebar');
    sidebar.style.left = `-${sidebar.offsetWidth + 1}px`;
});
