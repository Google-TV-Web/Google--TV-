const movies=[
 {title:"Dune : Deuxième partie",year:"2024 · Science-fiction",img:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",desc:"Paul Atréides rejoint les Fremen et poursuit son destin sur la planète Arrakis."},
 {title:"Spider-Man : Across the Spider-Verse",year:"2023 · Animation",img:"https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5XjkvL7.jpg",desc:"Miles Morales traverse des univers parallèles et rencontre une équipe de Spider-héros."},
 {title:"Avatar : La voie de l'eau",year:"2022 · Aventure",img:"https://image.tmdb.org/t/p/w500/t6HIQR5v1j1y2c8i3h6q6n6Z5Z.jpg",desc:"Une nouvelle aventure spectaculaire au cœur de Pandora."},
 {title:"Black Panther",year:"2018 · Action",img:"https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",desc:"Le royaume du Wakanda doit protéger son avenir."},
 {title:"Top Gun : Maverick",year:"2022 · Action",img:"https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",desc:"Maverick entraîne une nouvelle génération de pilotes d'élite."},
 {title:"Le Chat Potté 2",year:"2022 · Animation",img:"https://image.tmdb.org/t/p/w500/kxB9E6fo0ycHzd13oWXz3Yw7y5w.jpg",desc:"Le Chat Potté part à la recherche de la dernière étoile à souhaits."}
];
const shows=[
 {title:"Mercredi",year:"Série · Mystère",img:"https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",desc:"Mercredi Addams enquête sur une série de mystères dans une étrange académie."},
 {title:"Stranger Things",year:"Série · Fantastique",img:"https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",desc:"Des adolescents affrontent des phénomènes surnaturels dans leur ville."},
 {title:"Lupin",year:"Série · Policier",img:"https://image.tmdb.org/t/p/w500/sgxawbFB5Vi5OkPWQLNfl3dv.jpg",desc:"Assane Diop s'inspire d'Arsène Lupin pour préparer ses coups."},
 {title:"The Last of Us",year:"Série · Drame",img:"https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrkEn23QygaWz.jpg",desc:"Un voyage dangereux dans un monde bouleversé."},
 {title:"One Piece",year:"Série · Aventure",img:"https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",desc:"Luffy et son équipage partent à la recherche du trésor légendaire."},
 {title:"La Casa de Papel",year:"Série · Thriller",img:"https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",desc:"Un groupe de braqueurs met au point un plan audacieux."}
];
const all=[...movies,...shows];
function render(items,target){document.getElementById(target).innerHTML=items.map((x,i)=>`<article class="poster-card" data-title="${x.title.toLowerCase()}" data-index="${all.indexOf(x)}"><img loading="lazy" src="${x.img}" alt="Affiche ${x.title}" onerror="this.style.background='linear-gradient(140deg,#35415d,#252838)';this.removeAttribute('src')"><h3>${x.title}</h3><p>${x.year}</p></article>`).join('');}
render(movies,'movieList');render(shows,'seriesList');
document.addEventListener('click',e=>{const card=e.target.closest('.poster-card');if(!card)return;const item=all[Number(card.dataset.index)];document.getElementById('detailTitle').textContent=item.title;document.getElementById('detailDescription').textContent=item.desc;const img=document.getElementById('detailImage');img.src=item.img;img.alt=item.title;document.getElementById('detailDialog').showModal();});
document.getElementById('closeDialog').onclick=()=>document.getElementById('detailDialog').close();
document.getElementById('dialogOk').onclick=()=>document.getElementById('detailDialog').close();
document.getElementById('searchToggle').onclick=()=>{const p=document.getElementById('searchPanel');p.classList.toggle('visible');if(p.classList.contains('visible'))document.getElementById('searchInput').focus();};
document.getElementById('clearSearch').onclick=()=>{document.getElementById('searchInput').value='';filter('');};
function filter(q){document.querySelectorAll('.poster-card').forEach(c=>c.style.display=c.dataset.title.includes(q.toLowerCase())?'':'none');}
document.getElementById('searchInput').addEventListener('input',e=>filter(e.target.value.trim()));
