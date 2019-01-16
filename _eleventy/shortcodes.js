const authors = require("../src/_data/authors.json");

module.exports = {
  author: key => {
    const author = authors.filter(author => author.key === key)[0];

    return `<a href="${ author.url }" class="author" rel="noopener">by ${ author.name }</a>`;
  }
}
