
const API_KEY = 'f8500e0a7cdfb495e67105b8111ed8c9';  // Replace with your GNews API key
const API_URL = 'https://gnews.io/api/v4/search?token=' + API_KEY;

async function fetchNews(query = 'latest', country = '') {
    const countryParam = country ? `&country=${country}` : '';
    const response = await fetch(`${API_URL}&q=${query}&lang=en${countryParam}`);
    const data = await response.json();

    displayNews(data.articles);
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        // Ensure the image exists, otherwise fallback to a placeholder
        const articleImage = article.image ? article.image : 'https://via.placeholder.com/300x200?text=No+Image';

        articleElement.innerHTML = `
            <img src="${articleImage}" alt="${article.title}" class="article-image">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

function fetchCategory(category) {
    fetchNews(category);
}

function fetchNewsByCountry() {
    const country = document.getElementById('countrySelect').value;
    fetchNews('latest', country);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeButton = document.getElementById('themeButton');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeButton.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeButton.textContent = '☀️';
    }
}

// Fetch the latest news on page load
window.onload = () => fetchNews();
