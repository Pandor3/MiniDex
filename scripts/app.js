console.log('Fichier JS Chargé');

fetch('./data/games.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        /* Ceci permet de trier les jeux du plus ancien au plus récent */
        data.sort((nouveau, ancien) => nouveau.year - ancien.year);

        /* Ceci permet de classer les consoles dans un tableau en lisant les cartes de jeu */
        let uniqueConsoles = [];
        data.forEach(game => {
            game.console.forEach(consoleName => {
                if (!uniqueConsoles.includes(consoleName)) {
                    uniqueConsoles.push(consoleName);
                }
            });
        });

        /* Ceci permet de mettre les consoles dans le système de filtrage */
        const selectElement = document.getElementById('consoles-select');
        uniqueConsoles.forEach(consoleName => {
            const option = document.createElement('option');
            option.textContent = consoleName;
            option.value = consoleName;
            selectElement.appendChild(option);
        });

        
        const gallery = document.getElementById('game-gallery');
        
        /* Création des cartes de jeux dynamiquement */
        function showGames(list) {
            list.forEach(game => {
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

                gallery.appendChild(card);
        });
    }
    /* Système de filtrage par consoles */
    showGames(data);
    selectElement.addEventListener('change', event => {
        const selectedConsole = event.target.value;
        gallery.innerHTML = "";

        if (selectedConsole === "all") {
            showGames(data);
        } else {
            const gamesFilter = data.filter(game => game.console.includes(selectedConsole));
            showGames(gamesFilter);
        }
    });
});
