/**
 * Utility functions for the magazine site
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text safe for HTML insertion
 */
function escapeHtml(text) {
    if (text === null || text === undefined) {
        return '';
    }
    const map = {
        '&': '&amp;',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": '&#039;',
        '`': '&#96;'
    };
    return String(text).replace(/[&<>"'`]/g, function(m) {
        return map[m];
    });
}

/**
 * Creates a DOM element with text content (safer than innerHTML)
 * @param {string} tag - The tag name
 * @param {string} text - The text content
 * @param {Object} attributes - Additional attributes
 * @returns {HTMLElement} - The created element
 */
function createElementWithText(tag, text, attributes = {}) {
    const element = document.createElement(tag);
    element.textContent = text || '';
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}
