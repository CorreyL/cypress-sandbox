const BASE_URL = 'https://www.uniqlo.com/';
const region = 'ca';
const language = 'en';

const websitePath = `${BASE_URL}${region}/${language}`;

/**
 * Builds the full URL for performing a search of the provided query on the
 * Uniqlo website
 *
 * @param {string} searchQuery The user's search query string
 * @returns {string} The URL to perform the search query
 */
const searchUrl = (searchQuery) => {
  return `${websitePath}/search/?q=${searchQuery}`;
};

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
