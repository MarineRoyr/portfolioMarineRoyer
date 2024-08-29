$(document).ready(function () {
    // URL du fichier JSON ou de l'API
    const jsonUrl = './data/dataStacks.json';

    // Utilisation de fetch pour récupérer les données JSON
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des données');
            }
            return response.json();
        })
        .then(stacks => {
            // Sélectionne le conteneur de la galerie
            const $gallery = $('.stacks-gallery');

            // Parcourt chaque stack et crée les éléments HTML
            stacks.forEach(stack => {
                const $galleryItem = $(`
                    <div class="gallery-item">
                        <img src="${stack.picture}" alt="${stack.title}">
                        <h3>${stack.title}</h3>
                    </div>
                `);

                // Ajoute chaque élément à la galerie
                $gallery.append($galleryItem);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});
