async function fetchLeBronNews() {
  const apiKey = 'e07d5bb8aae446cc85f2862562c058dc'; // Your API key here
  const endpoint = `https://newsapi.org/v2/everything?q=lebron+james&sortBy=publishedAt&pageSize=6&language=en&apiKey=${apiKey}`;
  fetch('https://newsapi.org/v2/everything?q=lebron+james&sortBy=publishedAt&pageSize=1&language=en&apiKey=e07d5bb8aae446cc85f2862562c058dc')
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    if (data.articles.length === 0) {
      newsContainer.innerHTML = '<p class="col-span-full text-center text-gray-600">No recent news found.</p>';
      return;
    }

    data.articles.forEach(article => {
      const articleEl = document.createElement('div');
      articleEl.className = 'border rounded-lg shadow-lg p-4 flex flex-col justify-between';

      articleEl.innerHTML = `
        <h3 class="text-lg font-semibold mb-2">${article.title}</h3>
        <p class="text-sm text-gray-700 mb-4 line-clamp-3">${article.description || ''}</p>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="mt-auto text-yellow-500 hover:text-yellow-600 font-semibold">
          Read More &rarr;
        </a>
      `;

      newsContainer.appendChild(articleEl);
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Failed to load news. Please try again later.</p>';
  }
}

fetchLeBronNews();

