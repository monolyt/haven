const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const sunElement = document.querySelector('.sun');
const moonElement = document.querySelector('.moon');

// Add no-transition class to disable transitions on load
document.documentElement.classList.add('no-transition');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        sunElement.classList.add('hidden');
        moonElement.classList.remove('hidden');
    } else {
        sunElement.classList.remove('hidden');
        moonElement.classList.add('hidden');
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sunElement.style.transition = 'none';
        sunElement.classList.add('hidden');
        setTimeout(() => {
            sunElement.style.transition = ''; // Reset transition
            moonElement.classList.remove('hidden');
        }, 0);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        moonElement.style.transition = 'none';
        moonElement.classList.add('hidden');
        setTimeout(() => {
            moonElement.style.transition = ''; // Reset transition
            sunElement.classList.remove('hidden');
        }, 0);
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Remove no-transition class after page load
window.addEventListener('load', () => {
    document.documentElement.classList.remove('no-transition');
});
