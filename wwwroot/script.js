const apiUrl = '/api/Movies';

document.addEventListener('DOMContentLoaded', loadMovies);

// GET /api/Movies
async function loadMovies() {
    const response = await fetch(apiUrl);
    const movies = await response.json();

    const list = document.getElementById('movieList');
    list.innerHTML = '';

    movies.forEach(movie => {
        const row = document.createElement('tr');
        row.appendChild(cell(movie.title));
        row.appendChild(cell(movie.genre));
        row.appendChild(cell(movie.year));

        const button = document.createElement('button');
        button.className = 'btn-delete';
        button.textContent = 'Delete';
        button.addEventListener('click', () => deleteMovie(movie.id));

        const actions = document.createElement('td');
        actions.appendChild(button);
        row.appendChild(actions);

        list.appendChild(row);
    });
}

// Builds a table cell with text content, so values from the API are never
// injected into the page as HTML.
function cell(value) {
    const td = document.createElement('td');
    td.textContent = value ?? '';
    return td;
}

// POST /api/Movies
async function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;

    if (!title) {
        alert('A title is required.');
        return;
    }

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, year: parseInt(year) || 0 })
    });

    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('year').value = '';
    loadMovies();
}

// DELETE /api/Movies/{id}
async function deleteMovie(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    loadMovies();
}
