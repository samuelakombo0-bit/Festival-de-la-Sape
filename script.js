



// 1. On stocke tous les programmes dans un objet
const programmes = {
    vendredi: [
        {
            heure: "18:00",
            tag: "ÉVÉNEMENT",
            tagClass: "tag-evenement",
            titre: "Ouverture des Portes",
            desc: "Accueil immersif dans le village du festival avec installations lumineuses interactives."
        },
        {
            heure: "20:00",
            tag: "SAPE",
            tagClass: "tag-sape",
            titre: "Grand Défilé Sape",
            desc: "Les plus grands sapeurs de Brazzaville présentent leurs tenues sous des projections mapping exclusives."
        },
        {
            heure: "22:00",
            tag: "CONCERT",
            tagClass: "tag-concert",
            titre: "Concert Live",
            desc: "Performances d'artistes locaux et internationaux mêlant rumba congolaise et sonorités électroniques."
        }
    ],
    samedi: [
        {
            heure: "17:00",
            tag: "ATELIER",
            tagClass: "tag-evenement",
            titre: "Masterclass Stylisme",
            desc: "Rencontre avec les créateurs congolais. Apprenez les secrets de la Sape."
        },
        {
            heure: "21:00",
            tag: "CONCERT",
            tagClass: "tag-concert",
            titre: "Nuit Rumba",
            desc: "Les plus grandes voix de la rumba congolaise sur scène jusqu'à l'aube."
        }
    ],
    dimanche: [
        {
            heure: "16:00",
            tag: "SAPE",
            tagClass: "tag-sape",
            titre: "Concours du Meilleur Sapeur",
            desc: "Votez pour le roi de la sape 2026. 1 million à gagner."
        },
        {
            heure: "20:00",
            tag: "CLÔTURE",
            tagClass: "tag-concert",
            titre: "Show Final + Feu d'artifice",
            desc: "Clôture du festival avec mapping géant sur les tentes et show lumineux."
        }
    ]
};


function afficherProgramme(jour){ 
    const list = document.querySelector('.programme-list');
    list.innerHTML = ''; 
    programmes[jour].forEach(event => {
        const carte = `
             <div class="event-card">
                 <div class="time">${event.heure}</div>
                 <div class="event-info">
                     <span class="tag ${event.tagClass}">${event.tag}</span>
                     <h3>${event.titre}</h3>
                     <p>${event.desc}</p>
                 </div>
             </div>
         `;
         list.innerHTML += carte;
    })
    observerCartes();
}

// le clic sur les onglets
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const jour = tab.getAttribute('data-day');
        afficherProgramme(jour); // <-- 2 f ici aussi
    });
});

// 4. Afficher vendredi par défaut au chargement
document.addEventListener('DOMContentLoaded', () => {
    afficherProgramme('vendredi'); 
});

function observerCartes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // si la carte est visible à l'écran
                entry.target.classList.add('show'); // on ajoute la classe
                observer.unobserve(entry.target); // on arrête d'observer pour pas relancer l'anim
            }
        });
    }, {
        threshold: 0.2 // déclenche quand 20% de la carte est visible
    });

    // On observe toutes les cartes
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });
}

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.visage-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
       
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

      
        const filter = btn.getAttribute('data-filter'); 

       
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if(filter === 'all' || category === filter){
                card.style.display = 'block'; // on montre
            } else {
                card.style.display = 'none'; // on cache
            }
        });
    });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.icon');

  question.addEventListener('click', () => {
   
    faqItems.forEach(otherItem => {
      if(otherItem !== item){
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
        otherItem.querySelector('.icon').textContent = '+';
      }
    });

    
    item.classList.toggle('active');
    if(item.classList.contains('active')){
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = '-';
    } else {
      answer.style.maxHeight = null;
      icon.textContent = '+';
    }
  });
});