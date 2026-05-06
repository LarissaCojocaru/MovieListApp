const apiUrl = '/api/Movies'; // Adresa către controller-ul tău C#

// Se apelează automat când deschizi pagina
document.addEventListener('DOMContentLoaded', incarcaFilme);

// CITEȘTE filmele (GET)
async function incarcaFilme() {
    const response = await fetch(apiUrl);
    const filme = await response.json();

    const lista = document.getElementById('listaFilme');
    lista.innerHTML = '';

    filme.forEach(film => {
        lista.innerHTML += `
            <tr>
                <td>${film.title}</td>
                <td>${film.genre}</td>
                <td>${film.year}</td>
                <td><button class="btn-sterge" onclick="stergeFilm(${film.id})">Șterge</button></td>
            </tr>
        `;
    });
}

// ADAUGĂ un film nou (POST)
async function adaugaFilm() {
    const titlu = document.getElementById('titlu').value;
    const gen = document.getElementById('gen').value;
    const an = document.getElementById('an').value;

    if (!titlu) return alert('Titlul este obligatoriu!');

    const filmNou = {
        title: titlu,
        genre: gen,
        year: parseInt(an) || 0
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filmNou)
    });

    // Curăță căsuțele și reîncarcă lista
    document.getElementById('titlu').value = '';
    document.getElementById('gen').value = '';
    document.getElementById('an').value = '';
    incarcaFilme();
}

// ȘTERGE un film (DELETE)
async function stergeFilm(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    incarcaFilme();
}