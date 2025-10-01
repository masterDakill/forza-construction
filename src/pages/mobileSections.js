// Module de sections mobiles - Forza Construction
// Gère l'affichage des sections sur mobile

export function initMobileSections() {
    console.log('📱 Initializing mobile sections...');

    // Adapter les sections pour mobile
    adaptHeroForMobile();
    adaptServicesForMobile();
    adaptTestimonialsForMobile();
    adaptCTAForMobile();
    setupMobileMenu();

    console.log('✅ Mobile sections initialized');
}

function adaptHeroForMobile() {
    // Réduire le padding sur mobile
    if ($w('#heroSection')) {
        $w('#heroSection').style.padding = '40px 20px';
    }

    // Textes plus courts pour mobile
    if ($w('#textHeroTitle')) {
        $w('#textHeroTitle').style.fontSize = '28px';
        $w('#textHeroTitle').style.lineHeight = '1.2';
    }

    if ($w('#textHeroSubtitle')) {
        $w('#textHeroSubtitle').style.fontSize = '16px';
    }

    // Boutons pleine largeur sur mobile
    const buttons = ['#btnDevisGratuit', '#btnVoirRealisations', '#btnContact'];
    buttons.forEach(btnId => {
        if ($w(btnId)) {
            $w(btnId).style.width = '100%';
            $w(btnId).style.marginBottom = '10px';
        }
    });
}

function adaptServicesForMobile() {
    // Services en carousel sur mobile
    if ($w('#repeaterServices')) {
        // Afficher 1 service à la fois sur mobile
        $w('#repeaterServices').style.gridTemplateColumns = '1fr';
        $w('#repeaterServices').style.gap = '20px';
    }

    // Simplifier la description sur mobile
    if ($w('#repeaterServices')) {
        $w('#repeaterServices').onItemReady(($item, service) => {
            if ($item('#textServiceDescription')) {
                // Tronquer description si trop longue
                const desc = $item('#textServiceDescription').text;
                if (desc.length > 80) {
                    $item('#textServiceDescription').text = desc.substring(0, 80) + '...';
                }
            }
        });
    }
}

function adaptTestimonialsForMobile() {
    // Témoignages swipeable sur mobile
    if ($w('#repeaterTestimonials')) {
        $w('#repeaterTestimonials').style.overflowX = 'auto';
        $w('#repeaterTestimonials').style.scrollSnapType = 'x mandatory';
        $w('#repeaterTestimonials').style.webkitOverflowScrolling = 'touch';
    }
}

function adaptCTAForMobile() {
    // CTA collante en bas sur mobile
    if ($w('#ctaSection')) {
        $w('#ctaSection').style.position = 'sticky';
        $w('#ctaSection').style.bottom = '0';
        $w('#ctaSection').style.zIndex = '100';
        $w('#ctaSection').style.padding = '15px';
        $w('#ctaSection').style.background = 'white';
        $w('#ctaSection').style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
    }
}

function setupMobileMenu() {
    // Menu hamburger mobile
    if ($w('#menuMobile')) {
        $w('#menuMobile').onClick(() => {
            if ($w('#navMenu')) {
                $w('#navMenu').toggle();
            }
        });
    }

    // Fermer le menu au clic sur un lien
    const navLinks = ['#btnHome', '#btnServices', '#btnAbout', '#btnContact'];
    navLinks.forEach(linkId => {
        if ($w(linkId)) {
            $w(linkId).onClick(() => {
                if ($w('#navMenu')) {
                    $w('#navMenu').hide();
                }
            });
        }
    });
}

// Fonctions exportées
export function showMobileMessage(message, duration = 3000) {
    // Afficher un message toast sur mobile
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        z-index: 10000;
        font-size: 14px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

export function scrollToSection(sectionId) {
    // Scroll fluide vers une section (optimisé mobile)
    if ($w(sectionId)) {
        $w(sectionId).scrollTo({
            behavior: 'smooth'
        });
    }
}

export function setupSwipeGestures(element, callbacks) {
    // Ajouter swipe gestures à un élément
    let touchStartX = 0;
    let touchEndX = 0;

    element.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;

        if (touchEndX < touchStartX - swipeThreshold && callbacks.onSwipeLeft) {
            callbacks.onSwipeLeft();
        }

        if (touchEndX > touchStartX + swipeThreshold && callbacks.onSwipeRight) {
            callbacks.onSwipeRight();
        }
    }
}