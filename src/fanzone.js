document.addEventListener("DOMContentLoaded", () => {
  // === Overlay / Modal Elements ===
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayContent = document.getElementById("overlay-content");
  const closeBtn = document.getElementById("close-btn");

  // === Quiz Data ===
  const quizAnswers = {
    quizEasy: [
      { question: "What year was LeBron drafted?", correctAnswer: "2003", wrongOptions: ["2002", "2004"] },
      { question: "Which team drafted LeBron James?", correctAnswer: "cavs", wrongOptions: ["heat", "lakers"] },
      { question: "What is LeBron's primary position?", correctAnswer: "small forward", wrongOptions: ["point guard", "center"] },
      { question: "How tall is LeBron James (in cm)?", correctAnswer: "206", wrongOptions: ["198", "210"] },
      { question: "What is LeBron's jersey number with the Lakers?", correctAnswer: "6", wrongOptions: ["23", "3"] },
      { question: "What high school did LeBron attend?", correctAnswer: "st. vincent-st. mary", wrongOptions: ["oak hill", "findlay prep"] },
      { question: "In which city was LeBron born?", correctAnswer: "akron", wrongOptions: ["cleveland", "miami"] },
      { question: "What is LeBron's nickname?", correctAnswer: "king james", wrongOptions: ["the goat", "bron"] },
      { question: "Which NBA team does LeBron play for as of 2025?", correctAnswer: "lakers", wrongOptions: ["cavs", "heat"] },
      { question: "How many NBA championships has LeBron won?", correctAnswer: "4", wrongOptions: ["3", "5"] }
    ],
    quizMedium: [
      { question: "Which team did LeBron win his first NBA Championship with?", correctAnswer: "heat", wrongOptions: ["cavs", "lakers"] },
      { question: "How many NBA MVP awards has LeBron won?", correctAnswer: "4", wrongOptions: ["3", "5"] },
      { question: "In which year did LeBron win his first NBA Championship?", correctAnswer: "2012", wrongOptions: ["2011", "2013"] },
      { question: "How many points did LeBron score in his first NBA game?", correctAnswer: "25", wrongOptions: ["30", "20"] },
      { question: "LeBron was the youngest player to score how many points in a game?", correctAnswer: "40", wrongOptions: ["35", "50"] },
      { question: "Which number did LeBron wear when playing for Cleveland the first time?", correctAnswer: "23", wrongOptions: ["6", "32"] },
      { question: "LeBron led which college to a national championship?", correctAnswer: "none", wrongOptions: ["duke", "kentucky"] },
      { question: "What year did LeBron sign with the Miami Heat?", correctAnswer: "2010", wrongOptions: ["2009", "2011"] },
      { question: "LeBron was traded from the Cavaliers to which team?", correctAnswer: "none", wrongOptions: ["heat", "lakers"] },
      { question: "LeBron won Olympic gold medals in which years?", correctAnswer: "2008, 2012", wrongOptions: ["2004, 2008", "2012, 2016"] }
    ],
    quizHard: [
      { question: "How many total career points did LeBron surpass Kareem Abdul-Jabbar with?", correctAnswer: "38387", wrongOptions: ["38000", "39000"] },
      { question: "What is LeBron's career triple-double count as of 2025?", correctAnswer: "107", wrongOptions: ["100", "110"] },
      { question: "How many NBA Finals MVP awards has LeBron won?", correctAnswer: "4", wrongOptions: ["3", "5"] },
      { question: "LeBron was named NBA Rookie of the Year in which season?", correctAnswer: "2003-04", wrongOptions: ["2004-05", "2002-03"] },
      { question: "How many All-NBA First Team selections does LeBron have?", correctAnswer: "13", wrongOptions: ["12", "14"] },
      { question: "What year did LeBron return to the Cavaliers for the second time?", correctAnswer: "2014", wrongOptions: ["2013", "2015"] },
      { question: "Which college did LeBron commit to before entering the NBA?", correctAnswer: "none", wrongOptions: ["duke", "north carolina"] },
      { question: "What was LeBron's highest single-game scoring output?", correctAnswer: "61", wrongOptions: ["60", "62"] },
      { question: "How many total assists does LeBron have in his career as of 2025?", correctAnswer: "10300", wrongOptions: ["10000", "10500"] },
      { question: "LeBron surpassed which legend as the youngest player to reach 30,000 points?", correctAnswer: "kareem abdul-jabbar", wrongOptions: ["michael jordan", "kobe bryant"] }
    ]
  };

  // === Content Map for Other Overlays (Fan Poll, Gallery, Guestbook) ===
  const contentMap = {
  fanPoll: {
    title: "Fan Poll",
    content: `<div id="dynamic-polls-container" class="overflow-y-auto max-h-[500px] pr-2">Loading polls...</div>`
  },
  guestbook: {
    title: "Fan Guestbook",
    content: `
      <p class="mb-2">Leave a message for the King:</p>
      <input id="guest-name" class="w-full p-2 border border-gray-300 rounded mb-2" placeholder="Your name..." />
      <textarea id="guest-message" class="w-full p-2 border border-gray-300 rounded mb-4" rows="4" placeholder="Your message..."></textarea>
      <button id="guestbook-submit" class="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit</button>
    `
  },
  fanGallery: {
    title: "Fan Gallery",
    content: `
      <div class="text-center p-6">
    <img src="./images/sunshien.png">
    <h2 class="text-2xl font-bold mb-2">Fan Gallery Coming Soon!</h2>
    <p class="text-gray-700 mb-4">We’re working hard to bring you amazing photos, videos, and fan art.</p>
    <p class="italic text-gray-500">Stay tuned and check back soon for updates!</p>
  </div>
    `
  }
};

function showComingSoonModal() {
  overlayContent.innerHTML = contentMap.fanGallery.content;
  overlayTitle.textContent = contentMap.fanGallery.title;
  overlay.classList.remove("hidden");
  // Close button for the coming soon modal
  document.getElementById("close-gallery").addEventListener("click", () => {
    overlay.classList.add("hidden");
    overlayContent.innerHTML = ""; // Clear content after closing
  });
}

  // === Utility Function to Shuffle Array ===
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // === Fetch and Render Dynamic Polls ===
  async function fetchAndRenderPolls(showVotes = false) {
    const container = document.getElementById("dynamic-polls-container");
    if (!container) return;

    try {
      const res = await fetch('get_polls.php');
      if (!res.ok) {
        container.textContent = 'Failed to load polls.';
        return;
      }
      const polls = await res.json();
      container.innerHTML = ''; // clear loading text

      // Load voted polls from sessionStorage
      let votedPolls = JSON.parse(sessionStorage.getItem('votedPolls') || '[]');

      polls.forEach(poll => {
        const pollDiv = document.createElement('div');
        pollDiv.className = 'poll p-4 mb-6 border rounded shadow-sm bg-white';

        const question = document.createElement('h4');
        question.textContent = poll.question;
        question.className = "font-semibold mb-3";
        pollDiv.appendChild(question);

        const form = document.createElement('form');
        form.dataset.pollId = poll.poll_index;
        form.className = "poll-form";

        // Check if user already voted this poll
        const alreadyVoted = votedPolls.includes(poll.poll_index);

        poll.options.forEach(option => {
          const label = document.createElement('label');
          label.className = 'option flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100';
          label.style.display = "flex";
          label.style.justifyContent = "space-between";
          label.style.alignItems = "center";
          label.style.marginTop = "0.5rem";

          const leftSpan = document.createElement('span');
          leftSpan.style.display = "flex";
          leftSpan.style.alignItems = "center";

          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = `poll_${poll.poll_index}`;
          radio.value = option.id;
          radio.disabled = alreadyVoted;  // disable radios if already voted

          leftSpan.appendChild(radio);
          leftSpan.appendChild(document.createTextNode(' ' + option.text));
          label.appendChild(leftSpan);

          const votesSpan = document.createElement('span');
          votesSpan.className = 'votes text-gray-600 text-sm ml-4';
          votesSpan.textContent = `Votes: ${option.votes}`;
          votesSpan.style.visibility = showVotes ? 'visible' : 'hidden';
          label.appendChild(votesSpan);

          form.appendChild(label);
        });

        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Vote';
        submitBtn.className = "mt-4 bg-black text-white rounded px-4 py-2 hover:bg-yellow-500";
        submitBtn.disabled = alreadyVoted;  // disable submit button if already voted

        if (alreadyVoted) {
          const votedMsg = document.createElement('p');
          votedMsg.textContent = "You have already voted on this poll.";
          votedMsg.className = "text-green-600 font-semibold mt-2";
          pollDiv.appendChild(votedMsg);
        }

        form.appendChild(submitBtn);

        form.addEventListener('submit', async e => {
          e.preventDefault();
          if (alreadyVoted) {
            alert('You have already voted on this poll.');
            return;
          }

          const selected = new FormData(form).get(`poll_${poll.poll_index}`);
          if (!selected) {
            alert('Please select an option!');
            return;
          }

          try {
            const res = await fetch('submit_poll.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({ polloptionid: selected })
            });
            const data = await res.json();
            if (data.success) {
              alert(data.message || 'Vote submitted!');
              votedPolls.push(poll.poll_index);
              sessionStorage.setItem('votedPolls', JSON.stringify(votedPolls));
              fetchAndRenderPolls(true); // Re-render with votes shown
            } else {
              alert('Error: ' + (data.error || 'Unknown error'));
            }
          } catch {
            alert('Error submitting vote.');
          }
        });

        pollDiv.appendChild(form);
        container.appendChild(pollDiv);
      });

    } catch (err) {
      container.textContent = 'Error loading polls.';
    }
  }

  // === Quiz Overlay Logic ===
  function showQuizOverlay(key) {
    const questions = quizAnswers[key];
    overlayTitle.textContent = key === "quizEasy" ? "Easy Quiz" : key === "quizMedium" ? "Medium Quiz" : "Hard Quiz";

    let quizHtml = `<form id="quiz-form" class="text-left space-y-6">`;

    questions.forEach((q, index) => {
      const options = shuffleArray([q.correctAnswer.toLowerCase(), ...q.wrongOptions.map(opt => opt.toLowerCase())]);

      quizHtml += `
        <div class="quiz-question">
          <p class="font-semibold">${index + 1}. ${q.question}</p>
          <div class="space-y-2 mt-2">
            ${options.map(opt => `
              <label class="flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
                <input type="radio" name="q${index}" value="${opt}" class="form-radio text-yellow-500" required />
                <span>${opt}</span>
              </label>
            `).join("")}
          </div>
        </div>
      `;
    });

    quizHtml += `
      <button type="submit" class="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit Answers</button>
    </form>`;

    overlayContent.innerHTML = quizHtml;

    // Dynamically adjust quiz form height & scrolling
    const quizForm = document.getElementById("quiz-form");
    const desiredHeight = Math.min(questions.length * 100, 600); // 100px per question, max 600px
    quizForm.style.height = desiredHeight + "px";
    quizForm.style.overflowY = (desiredHeight === 600) ? "auto" : "visible";

    overlay.classList.remove("hidden");

    // Quiz submission handler
    quizForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let score = 0;
      const formData = new FormData(quizForm);

      questions.forEach((q, i) => {
        const answer = formData.get(`q${i}`);
        if (answer && answer.toLowerCase() === q.correctAnswer.toLowerCase()) {
          score++;
        }
      });

      // Create a modal for username input
      overlayContent.innerHTML = `
        <div class="modal-content">
          <h2 class="text-xl font-bold mb-4">Enter your username</h2>
          <input id="username-input" class="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Your username..." />
          <button id="submit-username" class="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit</button>
        </div>
      `;
      overlay.classList.remove("hidden");

      // Handle username submission
      document.getElementById("submit-username").addEventListener("click", () => {
        const username = document.getElementById("username-input").value.trim();
        if (!username) {
          alert("Username is required to save your score.");
          return;
        }

        // Prepare data to send
        const dataToSend = new FormData();
        dataToSend.append("username", username);
        dataToSend.append("score", score);
        dataToSend.append("quiz_level", key);

        // Send score to PHP backend
        fetch("submit_quiz.php", {
          method: "POST",
          body: dataToSend
        })
        .then(response => response.text())
        .then(result => {
          alert(result);
          overlay.classList.add("hidden");
          overlayContent.innerHTML = ""; // Clear content after submission
        })
        .catch(error => {
          console.error("Error submitting quiz:", error);
          alert("Error submitting quiz score.");
        });
      });
    });
  }

  // === Function to open the fan poll overlay and fetch polls ===
  function openFanPoll() {
    showOverlay("Fan Poll", contentMap.fanPoll.content);
    fetchAndRenderPolls();
  }

  // === Function to show overlay with title and content ===
  function showOverlay(title, content) {
    overlayTitle.textContent = title;
    overlayContent.innerHTML = content;
    overlay.classList.remove("hidden");
  }

  // === Function to show guestbook overlay ===
  function showGuestbookOverlay() {
    showOverlay("Fan Guestbook", contentMap.guestbook.content);
    const submitBtn = document.getElementById("guestbook-submit");
    const nameInput = document.getElementById("guest-name");
    const messageInput = document.getElementById("guest-message");

    submitBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) {
        alert("Please fill in both fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);

      fetch("submit_message.php", {
        method: "POST",
        body: formData
      })
      .then(response => response.text())
      .then(result => {
        alert(result);
        messageInput.value = ""; // clear message only, keep name
      })
      .catch(error => {
        console.error("Submit error:", error);
        alert("Error submitting message.");
      });
    });
  }

  // === Event Listeners for Menu Buttons ===
  document.querySelectorAll("[data-key]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-key");
      if (["quizEasy", "quizMedium", "quizHard"].includes(key)) {
        showQuizOverlay(key);
      } else if (key === "fanPoll") {
        openFanPoll();
      } else if (key === "guestbook") {
        showGuestbookOverlay();
      } else if (key === "gallery") {
        showComingSoonModal();
      }
    });
  });

  // === Close Button to Hide Overlay ===
  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    overlayContent.innerHTML = "";
  });

  // === Click Outside Overlay Content to Close ===
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
      overlayContent.innerHTML = "";
    }
  });
});

// === Modal Image Open/Close Functions (Do Not Modify) ===
function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  
  modalImg.src = src;
  modal.classList.remove("hidden");

  modal.addEventListener("click", function handleOutsideClick(e) {
    if (e.target === modal) {
      closeImageModal();
      modal.removeEventListener("click", handleOutsideClick);
    }
  });
}

function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
}
