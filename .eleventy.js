const filters = require('./_eleventy/filters.js')
const shortcodes = require('./_eleventy/shortcodes.js')

module.exports = function(eleventyConfig) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  });

  // Shortcodes
  Object.keys(shortcodes).forEach(shortCodeName => {
    eleventyConfig.addShortcode(shortCodeName, shortcodes[shortCodeName])
  });
  
  // Collections
  eleventyConfig.addCollection("places", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/\/places\//) !== null;
    })
  });
  
  // Layout
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('search', 'layouts/search.njk');
  
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./browserconfig.xml");
  eleventyConfig.addPassthroughCopy("./_redirects");

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "json",
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

