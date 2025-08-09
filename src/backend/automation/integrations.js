// Backend - Intégrations et Automatisations
// Forza Construction Inc.

import wixData from 'wix-data';
import wixFetch from 'wix-fetch';
import wixSecrets from 'wix-secrets';

// === WEBHOOK MAKE.COM ===
export async function sendToMake(data) {
    const webhookUrl = await wixSecrets.getSecret("MAKE_WEBHOOK_URL");
    
    try {
        const response = await wixFetch.fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
                source: 'Wix Website'
            })
        });
        
        if (response.ok) {
            console.log('Make.com webhook success');
            return { success: true };
        }
    } catch (error) {
        console.error('Make.com webhook error:', error);
        return { success: false, error };
    }
}

// === AIRTABLE INTEGRATION ===
export async function syncWithAirtable(recordType, data) {
    const apiKey = await wixSecrets.getSecret("AIRTABLE_API_KEY");
    const baseId = await wixSecrets.getSecret("AIRTABLE_BASE_ID");
    
    const tables = {
        'lead': 'Leads',
        'project': 'Projects',
        'client': 'Clients',
        'invoice': 'Invoices'
    };
    
    const tableName = tables[recordType];
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    
    try {
        const response = await wixFetch.fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: data
            })
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Airtable sync error:', error);
        throw error;
    }
}

// === SLACK NOTIFICATIONS ===
export async function sendSlackNotification(channel, message) {
    const webhookUrl = await wixSecrets.getSecret("SLACK_WEBHOOK_URL");
    
    const payload = {
        channel: channel,
        text: message,
        username: 'Forza Bot',
        icon_emoji: ':construction:'
    };
    
    try {
        await wixFetch.fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('Slack notification error:', error);
    }
}

// === EMAIL AUTOMATION ===
export async function sendAutomatedEmail(to, templateId, variables) {
    // Intégration avec SendGrid/Mailchimp
    const apiKey = await wixSecrets.getSecret("SENDGRID_API_KEY");
    
    const emailData = {
        personalizations: [{
            to: [{ email: to }],
            dynamic_template_data: variables
        }],
        from: {
            email: 'constructionforzainc@gmail.com',
            name: 'Forza Construction'
        },
        template_id: templateId
    };
    
    try {
        const response = await wixFetch.fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        
        return response.ok;
    } catch (error) {
        console.error('Email automation error:', error);
        return false;
    }
}

// === LEAD SCORING ===
export async function calculateLeadScore(leadData) {
    let score = 0;
    
    // Critères de scoring
    if (leadData.budget > 100000) score += 30;
    else if (leadData.budget > 50000) score += 20;
    else if (leadData.budget > 25000) score += 10;
    
    if (leadData.timeline === 'immediate') score += 25;
    else if (leadData.timeline === '1_month') score += 15;
    else if (leadData.timeline === '3_months') score += 5;
    
    if (leadData.projectType === 'commercial') score += 20;
    if (leadData.source === 'referral') score += 15;
    if (leadData.previousClient) score += 20;
    
    // Classification
    let category;
    if (score >= 70) category = 'HOT';
    else if (score >= 40) category = 'WARM';
    else category = 'COLD';
    
    return { score, category };
}

// === CRM SYNC ===
export async function syncWithCRM(contact) {
    // HubSpot/Pipedrive integration
    const apiKey = await wixSecrets.getSecret("HUBSPOT_API_KEY");
    
    const contactData = {
        properties: {
            email: contact.email,
            firstname: contact.firstName,
            lastname: contact.lastName,
            phone: contact.phone,
            company: contact.company,
            lead_source: 'Website',
            lifecycle_stage: 'lead'
        }
    };
    
    try {
        const response = await wixFetch.fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('CRM sync error:', error);
        throw error;
    }
}

// === TRELLO PROJECT CREATION ===
export async function createTrelloCard(projectData) {
    const apiKey = await wixSecrets.getSecret("TRELLO_API_KEY");
    const token = await wixSecrets.getSecret("TRELLO_TOKEN");
    const listId = await wixSecrets.getSecret("TRELLO_LIST_ID");
    
    const cardData = {
        name: `${projectData.clientName} - ${projectData.projectType}`,
        desc: `Budget: ${projectData.budget}\nTimeline: ${projectData.timeline}\nDetails: ${projectData.description}`,
        idList: listId,
        due: projectData.deadline,
        idLabels: projectData.labels
    };
    
    const url = `https://api.trello.com/1/cards?key=${apiKey}&token=${token}`;
    
    try {
        const response = await wixFetch.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Trello card creation error:', error);
        throw error;
    }
}

// === GOOGLE CALENDAR SYNC ===
export async function createCalendarEvent(eventData) {
    // Intégration Google Calendar pour rendez-vous
    const calendarId = await wixSecrets.getSecret("GOOGLE_CALENDAR_ID");
    const apiKey = await wixSecrets.getSecret("GOOGLE_API_KEY");
    
    const event = {
        summary: eventData.title,
        description: eventData.description,
        start: {
            dateTime: eventData.startTime,
            timeZone: 'America/Toronto'
        },
        end: {
            dateTime: eventData.endTime,
            timeZone: 'America/Toronto'
        },
        attendees: eventData.attendees,
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 }
            ]
        }
    };
    
    try {
        const response = await wixFetch.fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            }
        );
        
        return await response.json();
    } catch (error) {
        console.error('Calendar event creation error:', error);
        throw error;
    }
}

// === EXPORT DES FONCTIONS ===
export {
    sendToMake,
    syncWithAirtable,
    sendSlackNotification,
    sendAutomatedEmail,
    calculateLeadScore,
    syncWithCRM,
    createTrelloCard,
    createCalendarEvent
};
