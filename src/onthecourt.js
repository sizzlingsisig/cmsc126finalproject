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

async function getLeBronId() {
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const targetUrl = encodeURIComponent("https://www.balldontlie.io/api/v1/players?search=lebron");

  const res = await fetch(proxyUrl + targetUrl);
  
  if (!res.ok) {
    throw new Error('Network response was not ok: ' + res.statusText);
  }

  const text = await res.json();
  const json = JSON.parse(text.contents);

  return json.data.find(player => player.first_name === "LeBron" && player.last_name === "James")?.id;
}


async function fetchCareerAverages() {
  const lebronId = await getLeBronId();
  const res = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${lebronId}`);
  const data = await res.json();
  return data.data;
}

async function renderCareerStats() {
  const stats = await fetchCareerAverages();
  const container = document.getElementById('averagesList');

  if (!stats.length) {
    container.innerHTML = `<li>Data not available.</li>`;
    return;
  }

  const latest = stats.at(-1); // Get the most recent season stats
  container.innerHTML = `
    <li>Points Per Game (PTS): ${latest.pts}</li>
    <li>Rebounds Per Game (REB): ${latest.reb}</li>
    <li>Assists Per Game (AST): ${latest.ast}</li>
    <li>Steals Per Game (STL): ${latest.stl}</li>
    <li>Blocks Per Game (BLK): ${latest.blk}</li>
    <li>Minutes Per Game (MIN): ${latest.min}</li>
  `;
}

function renderAchievements() {
  // Predefined achievements
  const championships = [
    "2012 - Miami Heat",
    "2013 - Miami Heat",
    "2016 - Cleveland Cavaliers",
    "2020 - Los Angeles Lakers"
  ];

  const mvps = [
    "2009", "2010", "2012", "2013"
  ];

  const other = [
    "NBA Rookie of the Year (2004)",
    "NBA All-Time Leading Scorer (2023)",
    "20× NBA All-Star (2005–2024)",
    "4× NBA Finals MVP (2012, 2013, 2016, 2020)"
  ];

  document.getElementById('championshipsList').innerHTML = championships.map(item => `<li>${item}</li>`).join('');
  document.getElementById('mvpList').innerHTML = mvps.map(year => `<li>${year}</li>`).join('');
  document.getElementById('achievementsList').innerHTML = other.map(item => `<li>${item}</li>`).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  renderCareerStats();
  renderAchievements();
});
