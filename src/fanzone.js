document.addEventListener("DOMContentLoaded", () => {
  // === DOM Elements ===
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayContent = document.getElementById("overlay-content");
  const closeBtn = document.getElementById("close-btn");

  // === State Management ===
  let currentPollIndex = 0;
  let pollData = [];
  let userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};

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

  // === Content Templates ===
  const contentTemplates = {
    fanPoll: {
      title: "Fan Poll",
      content: `
        <div id="poll-container" class="overflow-y-auto max-h-[500px] pr-2">
          <div class="poll-card bg-white p-6 rounded-lg shadow-md">
            <h3 id="poll-question" class="text-xl font-bold mb-4"></h3>
            <form id="poll-form" class="space-y-3">
              <div id="poll-options"></div>
              <button id="vote-btn" type="submit" class="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-yellow-500 w-full">Vote</button>
            </form>
            <div id="poll-results" class="mt-4 hidden">
              <h4 class="font-semibold mb-2">Results:</h4>
              <div id="results-container" class="space-y-2"></div>
            </div>
            <div class="flex justify-between mt-6">
              <button id="prev-poll" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Previous</button>
              <button id="next-poll" class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Next</button>
            </div>
          </div>
        </div>
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
    },
    fanGallery: {
      title: "Fan Gallery",
      content: `
        <div class="text-center p-6">
          <img src="./images/sunshien.png" alt="Coming Soon">
          <h2 class="text-2xl font-bold mb-2">Fan Gallery Coming Soon!</h2>
          <p class="text-gray-700 mb-4">We're working hard to bring you amazing photos, videos, and fan art.</p>
          <p class="italic text-gray-500">Stay tuned and check back soon for updates!</p>
        </div>
      `
    },
  leaderboard: {
  title: "Quiz Leaderboard",
  content: `
    <div id="leaderboard-container" class="overflow-y-auto max-h-[500px] p-4 bg-white rounded-lg shadow-md">
      <h3 class="text-xl font-bold mb-4">Top Quiz Scores</h3>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="border-b p-2">Rank</th>
            <th class="border-b p-2">Username</th>
            <th class="border-b p-2">Score</th>
            <th class="border-b p-2">Quiz Level</th>
          </tr>
        </thead>
        <tbody id="leaderboard-rows">
          <!-- Dynamic leaderboard rows go here -->
        </tbody>
      </table>
    </div>
  `
}
  };

  // === Utility Functions ===
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const showOverlay = (title, content) => {
    overlayTitle.textContent = title;
    overlayContent.innerHTML = content;
    overlay.classList.remove("hidden");
  };

  const closeOverlay = () => {
    overlay.classList.add("hidden");
    overlayContent.innerHTML = "";
  };

  const showAlert = (message) => {
    alert(message);
  };

 // === API Functions ===
const api = {
  async loadPolls() {
    try {
      const response = await fetch('get_polls.php');
      if (!response.ok) throw new Error('Failed to load polls');
      return await response.json();
    } catch (error) {
      console.error('Error loading polls:', error);
      return null;
    }
  },

  async submitVote(pollId, optionId) {
    try {
      const formData = new URLSearchParams();
      formData.append('polloptionid', optionId);
      
      const response = await fetch('submit_poll.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to submit vote');
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Unknown error');
      
      return result;
    } catch (error) {
      console.error('Error submitting vote:', error);
      throw error;
    }
  },

  async submitQuiz(username, score, quizLevel) {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("score", score);
      formData.append("quiz_level", quizLevel);

      const response = await fetch("submit_quiz.php", {
        method: "POST",
        body: formData
      });
      
      return await response.text();
    } catch (error) {
      console.error("Error submitting quiz:", error);
      throw error;
    }
  },

  async submitGuestbookMessage(name, message) {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);

      const response = await fetch("submit_message.php", {
        method: "POST",
        body: formData
      });
      
      return await response.text();
    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    }
  },

  async fetchLeaderboard() {
    try {
      const response = await fetch('get_top_quiz.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // The data object will have keys: quizEasy, quizMedium, quizHard with arrays of results
      return data;
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      throw error; 
    }
  }
};

async function displayLeaderboard() {
  try {
    const data = await api.fetchLeaderboard();
    const container = document.getElementById("leaderboard-container");
    container.innerHTML = ""; // Clear existing content

    // For each quiz level, create a separate table with heading
    for (const level in data) {
      // Create section header
      const levelTitle = level.replace('quiz', '');
      const header = document.createElement("h3");
      header.textContent = `${levelTitle} Leaderboard`;
      header.classList.add("text-xl", "font-bold", "mt-6", "mb-2");
      container.appendChild(header);

      // Create table for this quiz level
      const table = document.createElement("table");
      table.classList.add("min-w-full", "border-collapse", "mb-4", "text-left");

      // Table header
      table.innerHTML = `
        <thead>
          <tr>
            <th class="border-b p-2">Rank</th>
            <th class="border-b p-2">Username</th>
            <th class="border-b p-2">Score</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;

      const tbody = table.querySelector("tbody");

      // Populate rows for this quiz level
      data[level].forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="border-b p-2">${index + 1}</td>
          <td class="border-b p-2">${entry.username}</td>
          <td class="border-b p-2">${entry.score}/10</td>
        `;
        tbody.appendChild(row);
      });

      container.appendChild(table);
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    showAlert("Failed to load leaderboard data.");
  }
}



// === Poll System (Updated) ===
const pollSystem = {
  renderPoll(index) {
    if (index < 0 || index >= pollData.length) return;
    
    const poll = pollData[index];
    const elements = {
      question: document.getElementById("poll-question"),
      options: document.getElementById("poll-options"),
      results: document.getElementById("poll-results"),
      resultsContainer: document.getElementById("results-container"),
      voteBtn: document.getElementById("vote-btn"),
      prevBtn: document.getElementById('prev-poll'),
      nextBtn: document.getElementById('next-poll')
    };
    
    elements.question.textContent = poll.question;
    elements.options.innerHTML = '';
    elements.resultsContainer.innerHTML = '';
    
    const hasVoted = userVotes[poll.poll_index] !== undefined;
    
    this.renderOptions(poll, elements, hasVoted);
    this.updateButtonStates(elements, hasVoted, index);
  },

  renderOptions(poll, elements, hasVoted) {
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    const userVotedOptionId = userVotes[poll.poll_index];
    
    poll.options.forEach(option => {
      const optionDiv = this.createOptionElement(option, hasVoted, totalVotes, userVotedOptionId);
      elements.options.appendChild(optionDiv);
    });
  },

  createOptionElement(option, hasVoted, totalVotes, userVotedOptionId) {
    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
    const isUserChoice = userVotedOptionId === option.id;
    
    const optionDiv = document.createElement('div');
    optionDiv.className = `relative flex items-center justify-between p-4 border-2 rounded-lg transition-all duration-200 ${
      hasVoted 
        ? isUserChoice 
          ? 'border-yellow-400 bg-yellow-50' 
          : 'border-gray-200 bg-gray-50'
        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-25 cursor-pointer'
    }`;
    
    // Left side: Radio button and text
    const leftSide = document.createElement('div');
    leftSide.className = 'flex items-center flex-1';
    
    // Custom radio button container
    const radioContainer = document.createElement('div');
    radioContainer.className = 'relative mr-4';
    
    const radio = document.createElement('input');
    Object.assign(radio, {
      type: 'radio',
      id: `option-${option.id}`,
      name: 'pollOption',
      value: option.id,
      className: 'sr-only', // Hide default radio
      disabled: hasVoted
    });
    
    // Custom radio button visual
    const radioVisual = document.createElement('div');
    radioVisual.className = `w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
  hasVoted && isUserChoice
    ? 'border-yellow-500 bg-yellow-500'
    : hasVoted
    ? 'border-gray-300 bg-gray-100'
    : 'border-gray-400 bg-white group-hover:border-yellow-400'
    
}`;

    
    // Radio button inner dot
    const radioDot = document.createElement('div');
    radioDot.className = `w-2 h-2 rounded-full bg-white transition-opacity duration-200 ${
  hasVoted && isUserChoice ? 'opacity-100' : 'opacity-0'
}`;
    radioVisual.appendChild(radioDot);
    
    const label = document.createElement('label');
    Object.assign(label, {
      htmlFor: `option-${option.id}`,
      className: `flex-1 font-medium text-gray-800 ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`,
      textContent: option.text
    });
    
    radioContainer.append(radio, radioVisual);
    leftSide.append(radioContainer, label);
    
    // Right side: Results (if voted)
    const rightSide = document.createElement('div');
    rightSide.className = `flex items-center space-x-3 ${hasVoted ? 'opacity-100' : 'opacity-0'}`;
    
if (hasVoted) {
  // Vote count and percentage only (no progress bar)
  const voteInfo = document.createElement('div');
  voteInfo.className = 'text-sm text-gray-600 min-w-[80px] text-right';
  voteInfo.innerHTML = `
    <div class="font-semibold">${percentage}%</div>
    <div class="text-xs">${option.votes} vote${option.votes !== 1 ? 's' : ''}</div>
  `;
  
  rightSide.appendChild(voteInfo);
}

    
    optionDiv.append(leftSide, rightSide);
    
    // Add click handler for the entire option div (when not voted)
    if (!hasVoted) {
      optionDiv.addEventListener('click', () => {
        radio.checked = true;
        // Update visual state of all options
        this.updateRadioVisuals();
      });
      
      // Add hover effects
      optionDiv.addEventListener('mouseenter', () => {
        if (!hasVoted) {
          radioVisual.classList.add('border-yellow-400', 'shadow-sm');
        }
      });
      
      optionDiv.addEventListener('mouseleave', () => {
        if (!hasVoted && !radio.checked) {
          radioVisual.classList.remove('border-yellow-400', 'shadow-sm');
        }
      });
    }
    
    return optionDiv;
  },

  updateRadioVisuals() {
    const radios = document.querySelectorAll('input[name="pollOption"]');
    radios.forEach(radio => {
      const visual = radio.nextElementSibling;
      const dot = visual.querySelector('div');
      
      if (radio.checked) {
        visual.classList.add('border-yellow-500', 'bg-yellow-100');
        dot.classList.remove('opacity-0');
        dot.classList.add('opacity-100', 'bg-yellow-500');
      } else {
        visual.classList.remove('border-yellow-500', 'bg-yellow-100');
        dot.classList.add('opacity-0');
        dot.classList.remove('opacity-100', 'bg-yellow-500');
      }
    });
  },

  updateButtonStates(elements, hasVoted, index) {
    elements.voteBtn.disabled = hasVoted;
    elements.voteBtn.className = `mt-6 px-6 py-3 rounded-lg font-semibold transition-all duration-200 w-full ${
      hasVoted 
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
        : 'bg-black text-white hover:bg-yellow-500 hover:text-black shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
    }`;
    elements.voteBtn.textContent = hasVoted ? 'Vote Submitted ✓' : 'Cast Your Vote';
    
    // Hide the separate results section since results are now inline
    elements.results.classList.add('hidden');
    
    elements.prevBtn.disabled = index === 0;
    elements.nextBtn.disabled = index === pollData.length - 1;
    
    // Style navigation buttons
    elements.prevBtn.className = `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      index === 0 
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
    }`;
    
    elements.nextBtn.className = `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      index === pollData.length - 1 
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
    }`;
  },

  setupEventListeners() {
    const pollForm = document.getElementById('poll-form');
    const prevBtn = document.getElementById('prev-poll');
    const nextBtn = document.getElementById('next-poll');

    pollForm.addEventListener('submit', this.handleVoteSubmission.bind(this));
    prevBtn.addEventListener('click', () => this.navigatePoll(-1));
    nextBtn.addEventListener('click', () => this.navigatePoll(1));
  },

  async handleVoteSubmission(e) {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="pollOption"]:checked');
    
    if (!selectedOption) {
      showAlert('Please select an option before voting!');
      return;
    }
    
    const pollId = pollData[currentPollIndex].poll_index;
    const optionId = parseInt(selectedOption.value);
    
    try {
      // Show loading state
      const voteBtn = document.getElementById('vote-btn');
      const originalText = voteBtn.textContent;
      voteBtn.textContent = 'Submitting...';
      voteBtn.disabled = true;
      
      await api.submitVote(pollId, optionId);
      this.updateLocalData(pollId, optionId);
      this.renderPoll(currentPollIndex);
      
    } catch (error) {
      showAlert('Failed to submit vote. Please try again.');
      // Reset button state on error
      const voteBtn = document.getElementById('vote-btn');
      voteBtn.textContent = 'Cast Your Vote';
      voteBtn.disabled = false;
    }
  },

  updateLocalData(pollId, optionId) {
    const poll = pollData.find(p => p.poll_index === pollId);
    if (poll) {
      const option = poll.options.find(o => o.id === optionId);
      if (option) option.votes += 1;
    }
    
    userVotes[pollId] = optionId;
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  },

  navigatePoll(direction) {
    const newIndex = currentPollIndex + direction;
    if (newIndex >= 0 && newIndex < pollData.length) {
      currentPollIndex = newIndex;
      this.renderPoll(currentPollIndex);
    }
  }
};

  // === Quiz System ===
  const quizSystem = {
    show(key) {
      const questions = quizAnswers[key];
      const title = this.getQuizTitle(key);
      
      overlayTitle.textContent = title;
      overlayContent.innerHTML = this.generateQuizHTML(questions);
      
      this.setupQuizForm(questions, key);
      overlay.classList.remove("hidden");
    },

    getQuizTitle(key) {
      const titles = {
        quizEasy: "Easy Quiz",
        quizMedium: "Medium Quiz", 
        quizHard: "Hard Quiz"
      };
      return titles[key] || "Quiz";
    },

    generateQuizHTML(questions) {
      const questionsHTML = questions.map((q, index) => {
        const options = shuffleArray([q.correctAnswer.toLowerCase(), ...q.wrongOptions.map(opt => opt.toLowerCase())]);
        
        return `
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
      }).join("");

      return `
        <form id="quiz-form" class="text-left space-y-6" style="max-height: 600px; overflow-y: auto;">
          ${questionsHTML}
          <button type="submit" class="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit Answers</button>
        </form>
      `;
    },

    setupQuizForm(questions, quizKey) {
      const quizForm = document.getElementById("quiz-form");
      quizForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const score = this.calculateScore(questions, new FormData(quizForm));
        this.showUsernamePrompt(score, quizKey);
      });
    },

    calculateScore(questions, formData) {
      return questions.reduce((score, q, i) => {
        const answer = formData.get(`q${i}`);
        return answer && answer.toLowerCase() === q.correctAnswer.toLowerCase() ? score + 1 : score;
      }, 0);
    },

    showUsernamePrompt(score, quizKey) {
      overlayContent.innerHTML = `
        <div class="modal-content">
          <h2 class="text-xl font-bold mb-4">Enter your username</h2>
          <input id="username-input" class="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Your username..." />
          <button id="submit-username" class="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500">Submit</button>
        </div>
      `;

      document.getElementById("submit-username").addEventListener("click", () => {
        this.handleUsernameSubmission(score, quizKey);
      });
    },

   

   async handleUsernameSubmission(score, quizKey) {
  const username = document.getElementById("username-input").value.trim();
  if (!username) {
    showAlert("Username is required to save your score.");
    return;
  }

  try {
    const result = await api.submitQuiz(username, score, quizKey);
    // Replace alert with modal content showing score and confirmation message
    overlayContent.innerHTML = `
      <div class="modal-content text-center p-6">
        <h2 class="text-2xl font-bold mb-4 text-yellow-600">Quiz Submitted!</h2>
        <p class="text-lg mb-6">Thank you, <span class="font-semibold">${username}</span>.</p>
        <p class="text-xl mb-4">Your score: <span class="font-extrabold text-black">${score} / ${quizAnswers[quizKey].length}</span></p>
        <button id="close-score-modal" class="bg-black text-white px-6 py-2 rounded hover:bg-yellow-500">Close</button>
      </div>
    `;

    document.getElementById("close-score-modal").addEventListener("click", () => {
      closeOverlay();
    });

  } catch (error) {
    showAlert("Error submitting quiz score.");
  }
}



  };

  // === Feature Handlers ===
  const handlers = {
    async fanPoll() {
      showOverlay("Fan Poll", contentTemplates.fanPoll.content);
      
      // Show loading state
      document.getElementById("poll-question").textContent = "Loading polls...";
      document.getElementById("vote-btn").disabled = true;
      
      try {
        pollData = await api.loadPolls();
        if (pollData && pollData.length > 0) {
          pollSystem.renderPoll(currentPollIndex);
          pollSystem.setupEventListeners();
        } else {
          throw new Error("No polls available");
        }
      } catch (error) {
        document.getElementById("poll-question").textContent = "Failed to load polls. Please try again later.";
      }
    },

    guestbook() {
      showOverlay(contentTemplates.guestbook.title, contentTemplates.guestbook.content);
      
      const submitBtn = document.getElementById("guestbook-submit");
      submitBtn.addEventListener("click", this.handleGuestbookSubmit);
    },

    async handleGuestbookSubmit() {
      const name = document.getElementById("guest-name").value.trim();
      const message = document.getElementById("guest-message").value.trim();

      if (!name || !message) {
        showAlert("Please fill in both fields.");
        return;
      }

      try {
        const result = await api.submitGuestbookMessage(name, message);
        showAlert(result);
        document.getElementById("guest-message").value = "";
      } catch (error) {
        showAlert("Error submitting message.");
      }
    },

    gallery() {
      showOverlay(contentTemplates.fanGallery.title, contentTemplates.fanGallery.content);
    }
  };

  // === Event Listeners Setup ===
  function setupEventListeners() {
    // Menu button handlers
   const actionMap = {
  quizEasy: () => quizSystem.show('quizEasy'),
  quizMedium: () => quizSystem.show('quizMedium'),
  quizHard: () => quizSystem.show('quizHard'),
  fanPoll: handlers.fanPoll,
  guestbook: handlers.guestbook,
  gallery: handlers.gallery,
  leaderboard: async () => {
    showOverlay(contentTemplates.leaderboard.title, contentTemplates.leaderboard.content);
    await displayLeaderboard(); // Fetch and display leaderboard data
  }
};


    document.querySelectorAll("[data-key]").forEach(button => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-key");
        const action = actionMap[key];
        if (action) action();
      });
    });

    // Overlay close handlers
    closeBtn.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });
  }

  // === Initialize ===
  setupEventListeners();
});

// === Image Modal Functions (Global scope) ===
function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  
  modalImg.src = src;
  modal.classList.remove("hidden");

  const handleOutsideClick = (e) => {
    if (e.target === modal) {
      closeImageModal();
      modal.removeEventListener("click", handleOutsideClick);
    }
  };

  modal.addEventListener("click", handleOutsideClick);
}

function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
}