// Modern Design System - Forza Construction Inc.
// Système de design moderne et professionnel ultra-performant

export const modernDesignSystem = {
    // === PALETTE DE COULEURS PREMIUM ===
    colors: {
        // Couleurs principales
        primary: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316', // Orange principal
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12'
        },

        // Couleurs secondaires (bleu construction)
        secondary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e'
        },

        // Nuances de gris modernes
        neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717'
        },

        // Couleurs fonctionnelles
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6'
    },

    // === TYPOGRAPHIE MODERNE ===
    typography: {
        fontFamilies: {
            heading: '"Inter", "Segoe UI", system-ui, sans-serif',
            body: '"Inter", "Segoe UI", system-ui, sans-serif',
            mono: '"JetBrains Mono", "Fira Code", monospace'
        },

        fontSizes: {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem', // 30px
            '4xl': '2.25rem', // 36px
            '5xl': '3rem',    // 48px
            '6xl': '3.75rem', // 60px
            '7xl': '4.5rem'   // 72px
        },

        fontWeights: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        },

        lineHeights: {
            tight: 1.1,
            normal: 1.5,
            relaxed: 1.6,
            loose: 1.8
        }
    },

    // === ESPACEMENTS MODULAIRES ===
    spacing: {
        xs: '0.5rem',   // 8px
        sm: '1rem',     // 16px
        md: '1.5rem',   // 24px
        lg: '2rem',     // 32px
        xl: '3rem',     // 48px
        '2xl': '4rem',  // 64px
        '3xl': '6rem',  // 96px
        '4xl': '8rem',  // 128px
        '5xl': '12rem'  // 192px
    },

    // === OMBRES MODERNES ===
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        glow: '0 0 20px rgba(249, 115, 22, 0.3)'
    },

    // === RADIUS MODERNES ===
    borderRadius: {
        none: '0',
        sm: '0.125rem',  // 2px
        base: '0.25rem', // 4px
        md: '0.375rem',  // 6px
        lg: '0.5rem',    // 8px
        xl: '0.75rem',   // 12px
        '2xl': '1rem',   // 16px
        '3xl': '1.5rem', // 24px
        full: '9999px'
    },

    // === POINTS DE RUPTURE ===
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },

    // === ANIMATIONS ET TRANSITIONS ===
    animations: {
        durations: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms'
        },

        easings: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    }
};

// === COMPOSANTS DE BASE ===
export const designComponents = {
    // Boutons modernes
    buttons: {
        primary: {
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 14px 0 rgba(249, 115, 22, 0.25)',
            ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px 0 rgba(249, 115, 22, 0.35)'
            },
            ':active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 8px 0 rgba(249, 115, 22, 0.25)'
            }
        },

        secondary: {
            background: 'transparent',
            color: '#f97316',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            border: '2px solid #f97316',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ':hover': {
                background: '#f97316',
                color: '#ffffff',
                transform: 'translateY(-2px)'
            }
        },

        ghost: {
            background: 'transparent',
            color: '#525252',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ':hover': {
                background: '#f5f5f5',
                color: '#171717'
            }
        }
    },

    // Cartes modernes
    cards: {
        base: {
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e5e5',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }
        },

        elevated: {
            background: '#ffffff',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: 'none',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        },

        gradient: {
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 10px 30px 0 rgba(249, 115, 22, 0.3)',
            border: 'none'
        }
    },

    // Formulaires modernes
    forms: {
        input: {
            background: '#ffffff',
            border: '2px solid #e5e5e5',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '16px',
            fontWeight: '400',
            color: '#171717',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ':focus': {
                outline: 'none',
                borderColor: '#f97316',
                boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)'
            },
            '::placeholder': {
                color: '#a3a3a3'
            }
        },

        textarea: {
            background: '#ffffff',
            border: '2px solid #e5e5e5',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '16px',
            fontWeight: '400',
            color: '#171717',
            resize: 'vertical',
            minHeight: '120px',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ':focus': {
                outline: 'none',
                borderColor: '#f97316',
                boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.1)'
            }
        },

        label: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#404040',
            marginBottom: '8px',
            display: 'block'
        }
    },

    // Navigation moderne
    navigation: {
        navbar: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(229, 229, 229, 0.5)',
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            zIndex: '1000',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        },

        navLink: {
            color: '#525252',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '16px',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ':hover': {
                color: '#f97316',
                background: 'rgba(249, 115, 22, 0.1)'
            }
        },

        mobileMenu: {
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px',
            marginTop: '16px',
            boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.15)',
            border: '1px solid #e5e5e5'
        }
    }
};

// === UTILITAIRES CSS ===
export const cssUtilities = `
/* Système de design CSS personnalisé pour Forza Construction */

:root {
    /* Couleurs */
    --color-primary-50: #fff7ed;
    --color-primary-500: #f97316;
    --color-primary-600: #ea580c;
    --color-neutral-100: #f5f5f5;
    --color-neutral-500: #737373;
    --color-neutral-900: #171717;

    /* Typographie */
    --font-family-heading: "Inter", "Segoe UI", system-ui, sans-serif;
    --font-family-body: "Inter", "Segoe UI", system-ui, sans-serif;

    /* Espacements */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;

    /* Ombres */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

    /* Animations */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Classes utilitaires */
.forza-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
}

.forza-section {
    padding: 80px 0;
}

.forza-section-sm {
    padding: 60px 0;
}

.forza-gradient-text {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.forza-glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.forza-hover-lift {
    transition: var(--transition-normal);
}

.forza-hover-lift:hover {
    transform: translateY(-4px);
}

/* Animations personnalisées */
@keyframes forza-fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes forza-scale-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.forza-animate-fade-in {
    animation: forza-fade-in 0.6s ease-out;
}

.forza-animate-scale-in {
    animation: forza-scale-in 0.4s ease-out;
}

/* Responsive utilities */
@media (max-width: 768px) {
    .forza-section {
        padding: 60px 0;
    }

    .forza-container {
        padding: 0 16px;
    }
}

/* Print styles */
@media print {
    .forza-no-print {
        display: none !important;
    }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    :root {
        --color-primary-500: #000000;
        --color-neutral-500: #000000;
    }
}

/* Focus styles pour accessibilité */
.forza-focus-ring:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
}

/* Loading states */
.forza-skeleton {
    background: linear-gradient(90deg, #f5f5f5 25%, #e5e5e5 50%, #f5f5f5 75%);
    background-size: 200% 100%;
    animation: forza-skeleton-loading 1.5s infinite;
}

@keyframes forza-skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
`;

// Export du système complet
export default {
    modernDesignSystem,
    designComponents,
    cssUtilities
};