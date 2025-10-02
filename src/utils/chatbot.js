import wixChat from 'wix-chat';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import wixStorage from 'wix-storage';

/**
 * Centralises Forza Construction's chatbot behaviour by binding DOM triggers to Wix Chat,
 * storing visitor context for the contact form, and providing a resilient fallback when the
 * widget cannot be opened. The module exposes `initChatbot` for master-page initialisation
 * and `getStoredChatContext` so pages can recover the saved payload.
 */

const CHAT_CONTEXT_KEY = 'forzaChatContext';
const DEFAULT_CHAT_OPTIONS = {
    offlineRedirect: '/contact',
    defaultMessage: {
        fr: "Bonjour! J'aimerais discuter de mon projet de rénovation.",
        en: 'Hello! I would like to discuss my renovation project.',
    },
    triggerSelector: '[data-forza-chat]'
};

let currentChatOptions = { ...DEFAULT_CHAT_OPTIONS };
let triggersBound = false;

export function initChatbot(options = {}) {
    currentChatOptions = {
        ...DEFAULT_CHAT_OPTIONS,
        ...options,
        defaultMessage: {
            ...DEFAULT_CHAT_OPTIONS.defaultMessage,
            ...(options.defaultMessage || {})
        }
    };

    if (typeof window === 'undefined') {
        return;
    }

    bindChatTriggers();

    window.openChat = (context = {}) => openChatWithContext(context);
}

export async function openChatWithContext(context = {}) {
    const payload = {
        timestamp: new Date().toISOString(),
        source: context.source || window.currentPageName || 'unknown',
        subject: context.subject || null,
        message: context.message || null,
        meta: context.meta || {}
    };

    storeChatContext(payload);
    trackChatOpen(payload);

    try {
        await ensureChatAvailability();
        await wixChat.openChat();
    } catch (error) {
        console.warn('Chat widget unavailable, redirecting to contact form.', error);
        redirectToContact(payload);
    }
}

export function getStoredChatContext() {
    if (!wixStorage.session) {
        return null;
    }

    const raw = wixStorage.session.getItem(CHAT_CONTEXT_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        console.warn('Failed to parse stored chat context:', error);
        wixStorage.session.removeItem(CHAT_CONTEXT_KEY);
        return null;
    }
}

function storeChatContext(context) {
    if (!wixStorage.session) {
        return;
    }

    try {
        wixStorage.session.setItem(CHAT_CONTEXT_KEY, JSON.stringify(context));
    } catch (error) {
        console.warn('Unable to persist chat context:', error);
    }
}

async function ensureChatAvailability() {
    if (typeof wixChat.openChat === 'function') {
        return;
    }

    throw new Error('CHAT_WIDGET_UNAVAILABLE');
}

function redirectToContact(context) {
    const { offlineRedirect, defaultMessage } = currentChatOptions;
    const target = offlineRedirect || '/contact';

    const localizedMessage = determineLocalizedMessage(defaultMessage);
    const payload = context.message || localizedMessage;

    const query = new URLSearchParams({
        source: 'chat-fallback',
        intent: 'chat',
        message: payload
    });

    wixLocation.to(`${target}?${query.toString()}`);
}

function determineLocalizedMessage(messages) {
    if (!messages) {
        return '';
    }

    const browserLocale = wixWindow.browserLocale || wixWindow.locale || 'fr-CA';
    const language = browserLocale.split('-')[0];

    if (messages[language]) {
        return messages[language];
    }

    return messages.fr || messages.en || '';
}

function trackChatOpen(context) {
    if (typeof window === 'undefined') {
        return;
    }

    const analyticsPayload = {
        event_category: 'engagement',
        event_label: context.subject || context.source || 'chat',
        value: context.meta?.estimatedValue || undefined
    };

    if (typeof window.gtag === 'function') {
        window.gtag('event', 'chat_opened', analyticsPayload);
    }
}

function bindChatTriggers() {
    if (triggersBound || typeof document === 'undefined') {
        return;
    }

    triggersBound = true;

    const observer = new MutationObserver(() => {
        attachTriggers();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    attachTriggers();
}

function attachTriggers() {
    const { triggerSelector } = currentChatOptions;
    if (!triggerSelector) {
        return;
    }

    const elements = document.querySelectorAll(triggerSelector);
    elements.forEach((element) => {
        if (element.dataset.forzaChatBound === 'true') {
            return;
        }

        element.dataset.forzaChatBound = 'true';
        element.addEventListener('click', () => {
            openChatWithContext({
                source: element.dataset.chatSource || element.id || 'unknown-trigger',
                subject: element.dataset.chatSubject || null,
                message: element.dataset.chatMessage || null,
                meta: {
                    priority: element.dataset.chatPriority || 'normal'
                }
            });
        });
    });
}
