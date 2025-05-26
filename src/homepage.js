document.addEventListener('DOMContentLoaded', () => {
  startCountdown(
    '2025-12-30T00:00:00', // 🎯 Replace with your target date
    'days', 
    'hours', 
    'minutes', 
    'seconds'
  );
});

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
