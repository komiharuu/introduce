document.addEventListener('DOMContentLoaded', () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk3ZTJkYjhkZjlmMWZmNTBjMzBhYmFiZjRiNTEwMSIsInN1YiI6IjY2Mjc2NTdmYjlhMGJkMDE3YWQ4NjBmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tInSisldnXEtknErnx5Lbe2c6ZQH0AUjFmwrsKEWYBI'
        }
    };

    let allMovies = [];

    async function fetchMovies() {
        try {
            
            const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
            
           
            
            console.log('Response received:', response);
            
            const contentType = response.headers.get("content-type");
            console.log('Content-Type:', contentType);

            if ( contentType.includes("application/json")) {
                const data = await response.json();
                console.log('Parsed data:', data);
                allMovies = data.results;
                displayMovies(allMovies);
            } 
        } catch (error) {
            console.error('에러가 발생했습니다', error);
        }
    }

    function displayMovies(movies) {
        const container = document.getElementById('contain');
        if (!container) {
            console.error('영화를 찾을 수 없습니다');
            return;
        }

        container.innerHTML = '';

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            const title = movie.title;
            const overview = movie.overview;
            const voteAverage = movie.vote_average;

            card.innerHTML = `
                <img src="${posterPath}">
                <div class="movie-card-content">
                    <h2>${title}</h2>
                    <p>${overview}</p>
                    <div class="rating">Rating: ${voteAverage}</div>
                </div>
            `;

            card.addEventListener('click', () => {
                alert(`영화 ID: ${movie.id}`);
            });

            container.appendChild(card);
        });
    }

  



    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim().toLowerCase();
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(query));
        displayMovies(filteredMovies);
    });

    fetchMovies();
});



