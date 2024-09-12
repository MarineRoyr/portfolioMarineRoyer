$(document).ready(function(){const jsonUrl='./data/dataStacks.json';function getGradientFromLevel(level){const clampedLevel=Math.max(1,Math.min(level,10));const percentage=(clampedLevel-1)/9;const startColor=[112,177,238];const endColor=[8,67,82];function rgbToHex(rgb){return'#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('')}
const startColorHex=rgbToHex(startColor);const endColorHex=rgbToHex(endColor);return `linear-gradient(to right, ${startColorHex}, ${endColorHex})`}
fetch(jsonUrl).then(response=>{if(!response.ok){throw new Error('Erreur lors du chargement des données')}
return response.json()}).then(stacks=>{const $gallery=$('.stacks-gallery');stacks.forEach(stack=>{const gradient=getGradientFromLevel(stack.level);const percentage=stack.level*10;const title=stack.title?stack.title:'Titre non disponible';const $galleryItem=$(`
                    <div class="gallery-item" data-title="${stack.title}" data-picture="${stack.picture}" data-level="${stack.level}">
                        <img src="${stack.picture}" alt="${stack.title}">
                        <h3>${title}</h3>
                    </div>
                `);$gallery.append($galleryItem)});$('.stacks-gallery').poptrox({usePopupCaption:!0,caption:function($a){const level=$a.data('level');const gradient=getGradientFromLevel(level);const percentage=level*10;return `
                       <div class="progress-bar-container">
                            <div class="progress-bar">
                                <span class="progress-fill" style="width: ${percentage}%; background: ${gradient};"></span>
                            </div>
                        </div>
                    `},overlayColor:'#000',overlayOpacity:0.75,useBodyOverflow:!1,usePopupCloser:!0,usePopupNav:!0,usePopupDefaultStyling:!1,popupSpeed:300,windowMargin:50,popupWidth:'80%',popupHeight:'70%',fadeSpeed:300,});$('.gallery-item').on('click',function(){const title=$(this).data('title');const picture=$(this).data('picture');const level=$(this).data('level');const gradient=getGradientFromLevel(level);const percentage=level*10;const progressBar=`
                    <div>
                        <h3>Niveau de compétence : ${percentage}%</h3>
                        <div class="progress-bar-container">
                            <div class="progress-bar">
                                <span class="progress-fill" style="width: ${percentage}%; background: ${gradient};"></span>
                            </div>
                        </div>
                    </div>`;$('#modal-title').text(title?title:'Titre non disponible');$('#modal-image').attr('src',picture);$('#modal-progress').html(progressBar);$('#modal-overlay').fadeIn()});$('#modal-close').on('click',function(){$('#modal-overlay').fadeOut()});$('#modal-overlay').on('click',function(event){if($(event.target).is('#modal-overlay')){$('#modal-overlay').fadeOut()}})}).catch(error=>{console.error('Erreur:',error)})})