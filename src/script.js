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
function startCountdown(targetDate, daysId, hoursId, minutesId, secondsId) {
  const targetTime = new Date(targetDate).getTime();
  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;

    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      document.getElementById(daysId).textContent = '0';
      document.getElementById(hoursId).textContent = '0';
      document.getElementById(minutesId).textContent = '0';
      document.getElementById(secondsId).textContent = '0';
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById(daysId).textContent = days;
    document.getElementById(hoursId).textContent = hours;
    document.getElementById(minutesId).textContent = minutes;
    document.getElementById(secondsId).textContent = seconds;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  startCountdown('December 30, 2025 00:00:00', 'days', 'hours', 'minutes', 'seconds');
});