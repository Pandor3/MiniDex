console.log('Fichier JS Chargé');
fetch('./data/games.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        data.sort((nouveau, ancien) => nouveau.year - ancien.year);

    data.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');

        const img = document.createElement('img');
        img.setAttribute('src', game.cover);
        img.setAttribute('alt', game.title);
        card.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = game.title;
        card.appendChild(title);

        const year = document.createElement('p');
        year.textContent = "Année : " + game.year;
        card.appendChild(year);

        const consoles = document.createElement('p');
        consoles.textContent = "Consoles : " + game.console.join(", ");
        card.appendChild(consoles);

        const genres = document.createElement('p');
        genres.textContent = "Genres : " + game.genre.join(", ");
        card.appendChild(genres);

        const gallery = document.getElementById('game-gallery');
        gallery.appendChild(card);
    });
});
