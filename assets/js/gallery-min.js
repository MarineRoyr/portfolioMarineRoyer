document.addEventListener('DOMContentLoaded',function(){fetch('./data/dataProjets.json').then(response=>response.json()).then(data=>{const gallery=document.querySelector('#gallery');gallery.innerHTML='';data.forEach(project=>{const stacksList=project.stacks.map(stack=>`<li class='stack-gallery'>${stack}</li>`).join('');const article=document.createElement('article');article.classList.add('from-bottom')
const websiteLink=project.websiteUrl?`<a href="${project.websiteUrl}" target="_blank" class="website-link">Visiter le site</a>`:'';const captionContent=`
                    <h3>${project.title}</h3>
                      <div class="div-poptrox">
                    <h4>Description :</h4>
                    <p>${project.description}</p>
                    </div>
                    <div class="div-poptrox">
                    <h4>Stacks & Compétences :</h4>
                    <ul>${stacksList}</ul>
                    </div>
                      <div class="div-poptrox">
                    <h4>Missions & Challenges :</h4>
                    <p>${project.works}</p>
                    </div>
                    <div class="link-container div-poptrox">
                        <h4>Liens :</h4>
                         <a href="${project.githubUrl}" target="_blank" class="github-link"> <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                         ${websiteLink}
                         </div>
                   
                `.replace(/"/g,'&quot;').replace(/\n/g,'').trim();article.innerHTML=`
                     <a href="${project.picture}" class="image fit " data-caption="${captionContent}">
                        <div>
                            <img src="${project.picture}" title="${project.title}" alt="${project.title}">
                        </div>
                        <div><h3>${project.title}</h3>
                        <p>${project.description}</p>
                        </div>
                    </a>
                                   `;gallery.appendChild(article)});$('#gallery').poptrox({usePopupCaption:!0,caption:function($a){return $a.attr('data-caption')},overlayColor:'#000',overlayOpacity:0.75,useBodyOverflow:!1,usePopupCloser:!0,usePopupNav:!0,usePopupDefaultStyling:!1,popupSpeed:300,windowMargin:50,popupWidth:'85%',popupHeight:'75%',fadeSpeed:300,})}).catch(error=>console.error('Erreur lors du chargement des projets:',error))})