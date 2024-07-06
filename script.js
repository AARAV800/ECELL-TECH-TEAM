
async function fetchMovieDetails(movieTitle) {
    const apiKey = 'b6f55242'; 
    const url = https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)};
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
    }
}

async function searchMovies(event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
        alert('Please enter a movie title.');
        return;
    }

    const movieDetailsContainer = document.getElementById('movieDetails');
    movieDetailsContainer.innerHTML = '<p>Loading...</p>';

    try {
        const movieData = await fetchMovieDetails(searchInput);
        if (movieData && movieData.Response === 'True') {
            const { Title, Year, Rated, Genre, Director, Plot, Poster } = movieData;
            const movieHTML = `
                <img src="${Poster}" alt="${Title}" style="max-width: 100%;">
                <h2>${Title} (${Year})</h2>
                <p><strong>Rated:</strong> ${Rated}</p>
                <p><strong>Genre:</strong> ${Genre}</p>
                <p><strong>Director:</strong> ${Director}</p>
                <p><strong>Plot:</strong> ${Plot}</p>
            `;
            movieDetailsContainer.innerHTML = movieHTML;
        } else {
            movieDetailsContainer.innerHTML = '<p>Movie not found!</p>';
        }
    } catch (error) {
        console.error('Error searching movie:', error);
        movieDetailsContainer.innerHTML = '<p>Failed to fetch movie data.</p>';
    }
}


window.onload = function() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', searchMovies);
    } else {
        console.error('Search form not found.');
    }
};