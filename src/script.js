// Reference to hamburger menu and fullscreen menu
const toggleMenu = document.querySelector('#toggleMenu');
const fullscreenMenu = document.querySelector('#fullscreenMenu');

// Ensure elements exist before binding event listeners
if (toggleMenu && fullscreenMenu) {
  toggleMenu.addEventListener('click', () => {
    // Toggle hamburger animation
    toggleMenu.classList.toggle('hamburger-toggle');

    // Show or hide fullscreen menu
    if (fullscreenMenu.classList.contains('hidden')) {
      fullscreenMenu.classList.remove('hidden');
      setTimeout(() => {
        fullscreenMenu.classList.add('opacity-100', 'scale-100');
        fullscreenMenu.classList.remove('opacity-0', 'scale-95');
      }, 10);
    } else {
      fullscreenMenu.classList.add('opacity-0', 'scale-95');
      fullscreenMenu.classList.remove('opacity-100', 'scale-100');
      setTimeout(() => {
        fullscreenMenu.classList.add('hidden');
      }, 300); // Match this with your Tailwind CSS animation duration
    }
  });
}
