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

describe('search for sweatpants', () => {
  before(async () => {
    cy.visit(searchUrl('sweatpants'));
    await cy.wait(3000);
  });

  it('retrieves the number of search results', async () => {
    cy.get('.fr-results-count > .fr-form-label').should((result) => {
      // There should only be one DOM element that matches the above selector
      expect(result).to.have.length(1);
      // Make sure the textContent is not empty
      expect(result[0].textContent).to.not.equal('');
      // When split on the space character, there should be two items in the array
      expect(result[0].textContent.split(' ')).to.have.length(2);
      // Check that a number was retrieved
      const numberOfSearchResults = result[0].textContent.split(' ')[0];
      expect(Number.isNaN(numberOfSearchResults)).to.be.false;
      // There should have been at least one result
      expect(Number.parseInt(numberOfSearchResults)).to.be.greaterThan(0);
    });
  })
})
