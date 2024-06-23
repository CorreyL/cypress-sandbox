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
  beforeEach(async () => {
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
  });

  it('put the prices of all results into an array', () => {
    const pricesFromSearch = [];
    cy.get('div.fr-load-more').then(async (result) => {
      // The div.fr-load-more only shows up if there are more than 24 search
      // results, so we don't want to assert its existence
      if (result.length > 0) {
        result[0].click();
        await cy.wait(2000);
      }
    });

    cy.get('.fr-product-grid').should((result) => {
      // There should only be one DOM element that matches the above selector
      expect(result).to.have.length(1);
      const productResults = result[0].children;
      for (const product of productResults) {
        pricesFromSearch.push(product.querySelectorAll('.fr-price-currency')[1].children[1].textContent);
      }
      // There should be at least one search result
      expect(pricesFromSearch).to.have.length.greaterThan(0);
      // All elements of the array should be prices
      const priceRegex = /^\d+(\.\d{2})$/;
      pricesFromSearch.forEach((price) => {
        // Each price should be a number
        expect(Number.isNaN(price)).to.be.false;
        expect(price).to.match(priceRegex);
      });
    });
  });
})
