document.addEventListener('DOMContentLoaded', function () {
    fetch('./data/dataProjets.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.querySelector('#gallery');
            gallery.innerHTML = ''; // Vider la galerie pour éviter les duplications

            data.forEach(project => {
                const stacksList = project.stacks.map(stack => `<li class='stack-gallery'>${stack}</li>`).join('');

                const article = document.createElement('article');

                // Nettoyer et échapper le contenu de la légende
                const captionContent = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <ul>${stacksList}</ul>
                    <div class="github-link-container">
                        <a href="${project.githubUrl}" target="_blank" class="github-link">Sur GitHub</a>
                    </div>
                `.replace(/"/g, '&quot;').replace(/\n/g, '').trim();

                article.innerHTML = `
                    <a href="${project.picture}" class="image fit" data-caption="${captionContent}">
                        <div>
                            <img src="${project.picture}" title="${project.title}" alt="${project.title}">
                        </div>
                        <div><p>${project.title}</p></div>
                    </a>
                `;

                gallery.appendChild(article);
            });

            // Initialisation de Poptrox
            $('#gallery').poptrox({
                usePopupCaption: true,   // Utilisation des légendes dans les popups
                caption: function ($a) {
                    return $a.attr('data-caption');  // Récupération du contenu de la légende depuis l'attribut data-caption
                },
                overlayColor: '#000',
                overlayOpacity: 0.75,
                useBodyOverflow: false,
                usePopupCloser: true,
                usePopupNav: true,
                usePopupDefaultStyling: false,
                popupSpeed: 300,
                windowMargin: 50,
                popupWidth: 600,
                popupHeight: 400,
                fadeSpeed: 300,
            });
        })
        .catch(error => console.error('Erreur lors du chargement des projets:', error));
});
