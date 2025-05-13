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

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayContent = document.getElementById("overlay-content");
  const closeBtn = document.getElementById("close-btn");

  const contentMap = {
    fanPoll: {
      title: "Fan Poll",
      content: `
        <p class="mb-4">Who is the GOAT?</p>
        <form class="space-y-2 text-left">
          <label class="block"><input type="radio" name="goat" value="lebron" /> LeBron James</label>
          <label class="block"><input type="radio" name="goat" value="mj" /> Michael Jordan</label>
          <label class="block"><input type="radio" name="goat" value="kobe" /> Kobe Bryant</label>
          <button type="submit" class="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Vote</button>
        </form>
      `
    },
   quizEasy: {
  title: "Easy Quiz",
  content: `
    <p class="mb-4">What year was LeBron drafted?</p>
    <ul class="space-y-2 text-left">
      <li><input type="radio" name="easy" /> A. 2001</li>
      <li><input type="radio" name="easy" /> B. 2003</li>
      <li><input type="radio" name="easy" /> C. 2005</li>
    </ul>
  `
},
quizMedium: {
  title: "Medium Quiz",
  content: `
    <p class="mb-4">Which team did LeBron win his first NBA Championship with?</p>
    <ul class="space-y-2 text-left">
      <li><input type="radio" name="medium" /> A. Cleveland Cavaliers</li>
      <li><input type="radio" name="medium" /> B. Miami Heat</li>
      <li><input type="radio" name="medium" /> C. Los Angeles Lakers</li>
    </ul>
  `
},
quizHard: {
  title: "Hard Quiz",
  content: `
    <p class="mb-4">How many total career points did LeBron surpass Kareem Abdul-Jabbar with?</p>
    <ul class="space-y-2 text-left">
      <li><input type="radio" name="hard" /> A. 38,387</li>
      <li><input type="radio" name="hard" /> B. 38,390</li>
      <li><input type="radio" name="hard" /> C. 38,450</li>
    </ul>
  `
}
,
    gallery: {
      title: "Fan Gallery",
      content: `
        <p>Coming soon: Submit your fan art and media!</p>
        <div class="mt-4 text-gray-400 italic">No submissions yet.</div>
      `
    },
    guestbook: {
      title: "Fan Guestbook",
      content: `
        <p class="mb-2">Leave a message for the King:</p>
        <textarea class="w-full p-2 border border-gray-300 rounded mb-4" rows="4" placeholder="Your message..."></textarea>
        <button class="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit</button>
      `
    }
  };

  document.querySelectorAll("[data-key]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-key");
      const item = contentMap[key];
      if (item) {
        overlayTitle.textContent = item.title;
        overlayContent.innerHTML = item.content;
        overlay.classList.remove("hidden");
      }
    });
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    overlayContent.innerHTML = "";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
      overlayContent.innerHTML = "";
    }
  });
});
function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  
  modalImg.src = src;
  modal.classList.remove("hidden");

  // Add outside click detection
  modal.addEventListener("click", function handleOutsideClick(e) {
    if (e.target === modal) {
      closeImageModal();
      modal.removeEventListener("click", handleOutsideClick); // Clean up listener
    }
  });
}

function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
}

function initializeTimeline(timelineId) {
  const timeline = document.getElementById(timelineId);
  const points = timeline.querySelectorAll('.timeline-point');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  points.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
      const imageSrc = point.getAttribute('data-image');
      const description = point.getAttribute('data-description');

      tooltip.innerHTML = `
        <img src="${imageSrc}" alt="Timeline Event">
        <p>${description}</p>
      `;

      tooltip.style.display = 'block';
      const rect = point.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX - 100}px`;
      tooltip.style.top = `${rect.top + window.scrollY - 120}px`;
    });

    point.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
}

function enableHorizontalDragScroll(containerSelector) {
  const container = document.querySelector(containerSelector);
  let isDown = false;
  let startX, scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('cursor-grabbing');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('cursor-grabbing');
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('cursor-grabbing');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    container.scrollLeft = scrollLeft - walk;
  });
}