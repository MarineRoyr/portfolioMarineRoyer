$(document).ready(function () {
    // URL du fichier JSON ou de l'API
    const jsonUrl = './data/dataStacks.json';

    // Fonction pour générer la couleur de dégradé en fonction du niveau
    function getGradientFromLevel(level) {
        const clampedLevel = Math.max(1, Math.min(level, 10));
        const percentage = (clampedLevel - 1) / 9; // Normaliser entre 0 et 1

        // Couleurs de début et de fin du dégradé
        const startColor = [112, 177, 238]; // Bleu
        const endColor = [8, 67, 82]; // Vert

        // Convertir les couleurs en format hexadécimal pour le dégradé
        function rgbToHex(rgb) {
            return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
        }

        // Calculer la couleur de début et de fin du dégradé en fonction du niveau
        const startColorHex = rgbToHex(startColor);
        const endColorHex = rgbToHex(endColor);

        return `linear-gradient(to right, ${startColorHex}, ${endColorHex})`;
    }

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
                const gradient = getGradientFromLevel(stack.level);
                const percentage = stack.level * 10; // Convertir le niveau en pourcentage (1-10 -> 10%)

                // Générer l'élément de la galerie sans la barre de progression
                const $galleryItem = $(`
                    <div class="gallery-item" data-title="${stack.title}" data-picture="${stack.picture}" data-level="${stack.level}">
                        <img src="${stack.picture}" alt="${stack.title}">
                        <h3>${stack.title}</h3>
                    </div>
                `);

                // Ajouter l'élément de la galerie dans le conteneur
                $gallery.append($galleryItem);
            });

            // Initialisation de Poptrox pour afficher la barre de progression dans le caption
            $('.stacks-gallery').poptrox({
                usePopupCaption: true,
                caption: function ($a) {
                    const level = $a.data('level');
                    const gradient = getGradientFromLevel(level);
                    const percentage = level * 10; // Convertir le niveau en pourcentage (1-10 -> 10%)

                    return `
                       <div class="progress-bar-container">
                            <div class="progress-bar">
                                <span class="progress-fill" style="width: ${percentage}%; background: ${gradient};"></span>
                            </div>
                        </div>
                    `;
                },
                overlayColor: '#000',
                overlayOpacity: 0.75,
                useBodyOverflow: false,
                usePopupCloser: true,
                usePopupNav: true,
                usePopupDefaultStyling: false,
                popupSpeed: 300,
                windowMargin: 50,
                popupWidth: '80%',
                popupHeight: '70%',
                fadeSpeed: 300,
            });

            // Gérer le clic sur un élément de la galerie
            $('.gallery-item').on('click', function () {
                const picture = $(this).data('picture');
                const level = $(this).data('level');

                const gradient = getGradientFromLevel(level);
                const percentage = level * 10; // Convertir le niveau en pourcentage (1-10 -> 10%)

                // Créer le contenu de la barre de progression avec la chaîne de caractères ajoutée
                const progressBar = `
                    <div>
                        <h3>Niveau de compétence</h3>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <span class="progress-fill" style="width: ${percentage}%; background: ${gradient};"></span>
                            </div>
                        </div>
                    </div>`;

                // Mettre à jour le contenu de la modale
                $('#modal-image').attr('src', picture);
                $('#modal-progress').html(progressBar); // Ajouter la barre de progression dans la modale

                // Afficher la modale
                $('#modal-overlay').fadeIn();
            });

            // Gérer la fermeture de la modale
            $('#modal-close').on('click', function () {
                $('#modal-overlay').fadeOut();
            });

            // Fermer la modale si l'overlay est cliqué
            $('#modal-overlay').on('click', function (event) {
                if ($(event.target).is('#modal-overlay')) {
                    $('#modal-overlay').fadeOut();
                }
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
});
