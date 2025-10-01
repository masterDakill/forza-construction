// Guide de Style Complet - Forza Construction
// Design cohérent pour toutes les pages

export const FORZA_DESIGN_GUIDE = {
    // === PALETTE DE COULEURS ===
    colors: {
        // Couleurs primaires
        primary: {
            main: '#FF6B35',      // Orange vif professionnel
            dark: '#E55A2B',      // Orange foncé
            light: '#FF8A5C',     // Orange clair
            gradient: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)'
        },

        // Couleurs secondaires
        secondary: {
            main: '#2C3E50',      // Bleu gris foncé
            dark: '#1A252F',      // Presque noir
            light: '#34495E',     // Gris bleuté
            gradient: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)'
        },

        // Couleurs neutres
        neutral: {
            white: '#FFFFFF',
            black: '#000000',
            gray: {
                50: '#F9FAFB',
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#D1D5DB',
                400: '#9CA3AF',
                500: '#6B7280',
                600: '#4B5563',
                700: '#374151',
                800: '#1F2937',
                900: '#111827'
            }
        },

        // Couleurs de statut
        status: {
            success: '#10B981',   // Vert
            warning: '#F59E0B',   // Jaune/Orange
            error: '#EF4444',     // Rouge
            info: '#3B82F6'       // Bleu
        }
    },

    // === TYPOGRAPHIE ===
    typography: {
        // Familles de polices
        fontFamily: {
            primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            heading: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
        },

        // Tailles de police
        fontSize: {
            // Desktop
            desktop: {
                h1: '56px',       // Hero titles
                h2: '48px',       // Section titles
                h3: '36px',       // Subsections
                h4: '28px',       // Card titles
                h5: '24px',       // Small headings
                h6: '20px',       // Tiny headings
                body: '18px',     // Paragraphes normaux
                small: '16px',    // Texte secondaire
                tiny: '14px'      // Annotations
            },
            // Mobile
            mobile: {
                h1: '36px',
                h2: '32px',
                h3: '28px',
                h4: '24px',
                h5: '20px',
                h6: '18px',
                body: '16px',
                small: '14px',
                tiny: '12px'
            }
        },

        // Poids de police
        fontWeight: {
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        },

        // Hauteur de ligne
        lineHeight: {
            tight: 1.2,
            normal: 1.5,
            relaxed: 1.7,
            loose: 2
        }
    },

    // === ESPACEMENTS ===
    spacing: {
        // Espaces de base
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',

        // Sections
        section: {
            paddingY: {
                desktop: '80px',
                mobile: '40px'
            },
            paddingX: {
                desktop: '40px',
                mobile: '20px'
            },
            gap: {
                desktop: '40px',
                mobile: '24px'
            }
        },

        // Conteneurs
        container: {
            maxWidth: '1200px',
            padding: '0 20px'
        }
    },

    // === BORDURES ET OMBRES ===
    effects: {
        // Bordures arrondies
        borderRadius: {
            none: '0',
            sm: '4px',
            md: '8px',
            lg: '12px',
            xl: '16px',
            '2xl': '24px',
            full: '9999px'
        },

        // Ombres
        boxShadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

            // Ombres colorées
            primary: '0 10px 30px -5px rgba(255, 107, 53, 0.3)',
            secondary: '0 10px 30px -5px rgba(44, 62, 80, 0.3)'
        }
    },

    // === COMPOSANTS ===
    components: {
        // Boutons
        button: {
            // Tailles
            sizes: {
                small: {
                    padding: '8px 16px',
                    fontSize: '14px',
                    height: '36px'
                },
                medium: {
                    padding: '12px 24px',
                    fontSize: '16px',
                    height: '44px'
                },
                large: {
                    padding: '16px 32px',
                    fontSize: '18px',
                    height: '56px'
                }
            },

            // Styles
            styles: {
                primary: {
                    background: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px -5px rgba(255, 107, 53, 0.3)',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    hover: {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 35px -5px rgba(255, 107, 53, 0.4)'
                    }
                },
                secondary: {
                    background: '#FFFFFF',
                    color: '#FF6B35',
                    border: '2px solid #FF6B35',
                    borderRadius: '12px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    hover: {
                        background: '#FF6B35',
                        color: '#FFFFFF'
                    }
                }
            }
        },

        // Cartes
        card: {
            padding: '32px',
            background: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            hover: {
                transform: 'translateY(-8px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }
        },

        // Formulaires
        input: {
            padding: '14px 16px',
            fontSize: '16px',
            background: '#FFFFFF',
            border: '2px solid #E5E7EB',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            focus: {
                borderColor: '#FF6B35',
                boxShadow: '0 0 0 3px rgba(255, 107, 53, 0.1)'
            }
        }
    },

    // === ANIMATIONS ===
    animations: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms'
        },

        easing: {
            ease: 'ease',
            easeIn: 'ease-in',
            easeOut: 'ease-out',
            easeInOut: 'ease-in-out',
            spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },

    // === LAYOUT ===
    layout: {
        // Grilles
        grid: {
            columns: {
                desktop: 12,
                tablet: 8,
                mobile: 4
            },
            gap: {
                desktop: '32px',
                tablet: '24px',
                mobile: '16px'
            }
        },

        // Breakpoints
        breakpoints: {
            mobile: '640px',
            tablet: '768px',
            desktop: '1024px',
            wide: '1280px',
            ultrawide: '1536px'
        }
    }
};

// === FONCTION POUR APPLIQUER LES STYLES ===
export function applyForzaDesign(element, styles) {
    if (!element) return;

    Object.keys(styles).forEach(property => {
        element.style[property] = styles[property];
    });
}

// === CSS GLOBAL À INJECTER ===
export function generateGlobalCSS() {
    return `
        /* === RESET ET BASE === */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            font-size: 16px;
            scroll-behavior: smooth;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            font-family: ${FORZA_DESIGN_GUIDE.typography.fontFamily.primary};
            font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.body};
            line-height: ${FORZA_DESIGN_GUIDE.typography.lineHeight.normal};
            color: ${FORZA_DESIGN_GUIDE.colors.neutral.gray[900]};
            background: ${FORZA_DESIGN_GUIDE.colors.neutral.white};
        }

        /* === TYPOGRAPHIE === */
        h1, h2, h3, h4, h5, h6 {
            font-family: ${FORZA_DESIGN_GUIDE.typography.fontFamily.heading};
            font-weight: ${FORZA_DESIGN_GUIDE.typography.fontWeight.bold};
            line-height: ${FORZA_DESIGN_GUIDE.typography.lineHeight.tight};
            color: ${FORZA_DESIGN_GUIDE.colors.secondary.main};
        }

        h1 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h1}; }
        h2 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h2}; }
        h3 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h3}; }
        h4 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h4}; }
        h5 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h5}; }
        h6 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.desktop.h6}; }

        /* === MOBILE === */
        @media (max-width: ${FORZA_DESIGN_GUIDE.layout.breakpoints.mobile}) {
            html { font-size: 14px; }
            h1 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h1}; }
            h2 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h2}; }
            h3 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h3}; }
            h4 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h4}; }
            h5 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h5}; }
            h6 { font-size: ${FORZA_DESIGN_GUIDE.typography.fontSize.mobile.h6}; }
        }

        /* === CLASSES UTILITAIRES === */
        .forza-container {
            max-width: ${FORZA_DESIGN_GUIDE.spacing.container.maxWidth};
            margin: 0 auto;
            padding: ${FORZA_DESIGN_GUIDE.spacing.container.padding};
        }

        .forza-section {
            padding: ${FORZA_DESIGN_GUIDE.spacing.section.paddingY.desktop} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.desktop};
        }

        @media (max-width: ${FORZA_DESIGN_GUIDE.layout.breakpoints.mobile}) {
            .forza-section {
                padding: ${FORZA_DESIGN_GUIDE.spacing.section.paddingY.mobile} ${FORZA_DESIGN_GUIDE.spacing.section.paddingX.mobile};
            }
        }

        .forza-btn-primary {
            background: ${FORZA_DESIGN_GUIDE.components.button.styles.primary.background};
            color: ${FORZA_DESIGN_GUIDE.components.button.styles.primary.color};
            padding: ${FORZA_DESIGN_GUIDE.components.button.sizes.medium.padding};
            border-radius: ${FORZA_DESIGN_GUIDE.components.button.styles.primary.borderRadius};
            box-shadow: ${FORZA_DESIGN_GUIDE.components.button.styles.primary.boxShadow};
            font-weight: ${FORZA_DESIGN_GUIDE.components.button.styles.primary.fontWeight};
            border: none;
            cursor: pointer;
            transition: ${FORZA_DESIGN_GUIDE.components.button.styles.primary.transition};
        }

        .forza-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px -5px rgba(255, 107, 53, 0.4);
        }

        .forza-card {
            background: ${FORZA_DESIGN_GUIDE.components.card.background};
            padding: ${FORZA_DESIGN_GUIDE.components.card.padding};
            border-radius: ${FORZA_DESIGN_GUIDE.components.card.borderRadius};
            box-shadow: ${FORZA_DESIGN_GUIDE.components.card.boxShadow};
            transition: ${FORZA_DESIGN_GUIDE.components.card.transition};
        }

        .forza-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
    `;
}

export default FORZA_DESIGN_GUIDE;