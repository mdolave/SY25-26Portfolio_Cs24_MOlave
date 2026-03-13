// ghibli-movies.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const movieForm = document.getElementById('movieForm');
    const titleInput = document.getElementById('title');
    const yearInput = document.getElementById('year');
    const genreSelect = document.getElementById('genre');
    const ratingInput = document.getElementById('rating');
    const starRating = document.getElementById('starRating');
    const stars = starRating.querySelectorAll('i');
    const clearFormBtn = document.getElementById('clearForm');
    const movieList = document.getElementById('movieList');

    // Load movies from localStorage on page load
    loadMovies();

    // Star Rating Interaction
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            setRating(rating);
        });

        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });

        star.addEventListener('mouseleave', function() {
            const currentRating = parseInt(ratingInput.value) || 0;
            highlightStars(currentRating);
        });
    });

    // Function to set rating
    function setRating(rating) {
        ratingInput.value = rating;
        highlightStars(rating);
    }

    // Function to highlight stars
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            const starRating = index + 1;
            star.className = starRating <= rating ? 'fa fa-star' : 'fa fa-star-o';
        });
    }

    // Clear form
    clearFormBtn.addEventListener('click', function() {
        movieForm.reset();
        setRating(0);
    });

    // Add or Update Movie
    movieForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        const title = titleInput.value.trim();
        const year = yearInput.value.trim();
        const genre = genreSelect.value;
        const rating = parseInt(ratingInput.value);

        if (!title || !year || !genre || rating === 0) {
            alert('Please fill in all fields and select a rating!');
            return;
        }

        // Get existing movies
        let movies = JSON.parse(localStorage.getItem('movies')) || [];

        // Check if movie with same title already exists (case-insensitive)
        const existingIndex = movies.findIndex(m => m.title.toLowerCase() === title.toLowerCase());

        if (existingIndex !== -1) {
            // --- UPDATE EXISTING MOVIE ---
            const oldMovie = movies[existingIndex];
            // Average the new rating with the old one, round to nearest integer
            const avgRating = Math.round((oldMovie.rating + rating) / 2);
            // Update year, genre, and averaged rating, keep same id
            movies[existingIndex] = {
                ...oldMovie,
                year: year,
                genre: genre,
                rating: avgRating
            };
            alert(`Movie "${title}" updated. New average rating: ${avgRating}`);
        } else {
            // --- ADD NEW MOVIE ---
            const newMovie = {
                id: Date.now(),      // unique id based on timestamp
                title: title,
                year: year,
                genre: genre,
                rating: rating
            };
            movies.push(newMovie);
        }

        // Save updated array to localStorage
        localStorage.setItem('movies', JSON.stringify(movies));

        // Clear form and refresh movie list
        movieForm.reset();
        setRating(0);
        loadMovies();
    });

    // Delete movie (called via event delegation)
    function deleteMovie(movieId) {
        let movies = JSON.parse(localStorage.getItem('movies')) || [];
        // Filter out the movie with the matching id
        movies = movies.filter(m => m.id != movieId);  // use != to compare number with string if needed
        localStorage.setItem('movies', JSON.stringify(movies));
        loadMovies(); // re-display the list
    }

    // Event delegation for delete buttons (attached to the container)
    movieList.addEventListener('click', function(e) {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            // Get the movie id from the button's parent card (or from button's data-id)
            const movieCard = deleteBtn.closest('.movie-card');
            if (movieCard) {
                const movieId = movieCard.dataset.id;
                // Show confirmation dialog
                if (confirm('Are you sure you want to delete this movie?')) {
                    deleteMovie(movieId);
                }
            }
        }
    });

    // Function to load movies from localStorage and display
    function loadMovies() {
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        displayMovies(movies);
    }

    // Function to display movies in the grid
    function displayMovies(movies) {
        if (movies.length === 0) {
            movieList.innerHTML = '<div class="empty-state">No movies added yet. Add your first Ghibli movie!</div>';
            return;
        }

        let movieHTML = '';
        movies.forEach(movie => {
            movieHTML += createMovieCard(movie);
        });
        movieList.innerHTML = movieHTML;
    }

    // Function to create HTML for one movie card (includes Delete button)
    function createMovieCard(movie) {
        // Generate star icons based on rating
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= movie.rating ? '<i class="fa fa-star"></i>' : '<i class="fa fa-star-o"></i>');
        }

        return `
            <div class="movie-card" data-id="${movie.id}">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-year">${movie.year}</div>
                <span class="movie-genre">${movie.genre}</span>
                <div class="movie-rating">
                    ${stars.join('')}
                </div>
                <button class="delete-btn" data-id="${movie.id}">
                    <i class="fa fa-trash"></i> Delete
                </button>
            </div>
        `;
    }

});