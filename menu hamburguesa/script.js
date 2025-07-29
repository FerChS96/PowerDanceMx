//
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMenu();
    }
});
