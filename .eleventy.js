const filters = require('./_eleventy/filters.js')
const shortcodes = require('./_eleventy/shortcodes.js')
const feedtemplate = require('./_eleventy/feedtemplate.js')
const fs = require('fs');

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
      if (process.env.ELEVENTY_ENV === 'production' && item.inputPath.match(/\/places\//) !== null) {
        const metadata = item.data.metadata;
        const url = `${metadata.url}${item.url}`;

        const city = item.fileSlug;
        const feedName = `${city}.feed.xml`;
        const folder = item.outputPath.split(`index.html`)[0];

        var stats = fs.statSync(item.inputPath);

        const data = {
          title: item.data.title,
          feedUrl: `${url}${feedName}`,
          url: url,
          posts: item.data.postsgroup,
          id: url,
          authorMail: metadata.author.email,
          date: new Date(stats.mtime)
        };

        const template = feedtemplate.xml(data);

        fs.writeFile(`${folder}${feedName}`, template, function(err) {
          if(err) {
              return console.log(err);
          }
      
          console.log("The file was saved!");
        }); 
      }
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

