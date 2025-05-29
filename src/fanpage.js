document.addEventListener("DOMContentLoaded", () => {
  // === Overlay / Modal Elements ===
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayContent = document.getElementById("overlay-content");
  const closeBtn = document.getElementById("close-btn");
  const score = 0;

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
        <input id="guest-name" class="w-full p-2 border border-gray-300 rounded mb-2" placeholder="Your name..." />
        <textarea id="guest-message" class="w-full p-2 border border-gray-300 rounded mb-4" rows="4" placeholder="Your message..."></textarea>
        <button id="guestbook-submit" class="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit</button>
      `
    }
  };

  // === Utility Function to Shuffle Array ===
  function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // === Event Listeners for Menu Buttons ===
  document.querySelectorAll("[data-key]").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-key");

      if (["quizEasy", "quizMedium", "quizHard"].includes(key)) {
        // --- Quiz Overlay ---
        const questions = quizAnswers[key];
        overlayTitle.textContent = key === "quizEasy" ? "Easy Quiz" : key === "quizMedium" ? "Medium Quiz" : "Hard Quiz";

        let quizHtml = `<form id="quiz-form" class="text-left space-y-6">`;

        questions.forEach((q, index) => {
          const correct = q.correctAnswer.toLowerCase();
          const wrongOptions = q.wrongOptions.map(opt => opt.toLowerCase());
          let options = shuffleArray([correct, ...wrongOptions]);

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
        const questionCount = questions.length;
        const baseHeightPerQuestion = 100; // px per question, adjust if needed
        const maxHeight = 600; // max px

        let desiredHeight = questionCount * baseHeightPerQuestion;
        if (desiredHeight > maxHeight) desiredHeight = maxHeight;

        quizForm.style.height = desiredHeight + "px";
        quizForm.style.overflowY = (desiredHeight === maxHeight) ? "auto" : "visible";

        overlay.classList.remove("hidden");

        // Quiz submission handler (UPDATED)
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

          // Prompt for username before submitting score
          const username = prompt("Enter your username to save your score:");
          if (!username || username.trim() === "") {
            alert("Username is required to save your score.");
            return;
          }

          // Prepare data to send
          const dataToSend = new FormData();
          dataToSend.append("username", username.trim());
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
          })
          .catch(error => {
            console.error("Error submitting quiz:", error);
            alert("Error submitting quiz score.");
          });

          // Close overlay and clear content
          overlay.classList.add("hidden");
          overlayContent.innerHTML = "";
        });

      } else {
        // --- Other Overlays (fanPoll, gallery, guestbook) ---
        const item = contentMap[key];
        if (item) {
          overlayTitle.textContent = item.title;
          overlayContent.innerHTML = item.content;
          overlay.classList.remove("hidden");

          // Guestbook submit logic
          if (key === "guestbook") {
            setTimeout(() => {
              const submitBtn = document.getElementById("guestbook-submit");
              const nameInput = document.getElementById("guest-name");
              const messageInput = document.getElementById("guest-message");

        

              submitBtn.addEventListener("click", () => {
                const name = nameInput.value.trim();
                const message = messageInput.value.trim();

                if (!name || !message) {
                  alert("Please fill  in both fields.");
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
                  messageInput.value = ""; 
                })
                .catch(error => {
                  console.error("Submit error:", error);
                  alert("Error submitting message.");
                });
              });
            }, 50);
          }
        }
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
