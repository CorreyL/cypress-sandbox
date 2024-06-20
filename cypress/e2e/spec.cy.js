const BASE_URL = 'https://www.uniqlo.com/';
const region = 'ca';
const language = 'en';

const websitePath = `${BASE_URL}${region}/${language}`;

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
