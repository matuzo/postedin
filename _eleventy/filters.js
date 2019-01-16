const { DateTime } = require("luxon");

module.exports = {
  // Date formatting (human readable)
  readableDate: dateObj => {
    let date = DateTime.fromJSDate(dateObj);

    if (typeof dateObj === 'string') {
      date = DateTime.fromFormat(dateObj, "yyyy-MM-dd");
    }

    return date.toFormat("LLLL dd");
  },

  // Date formatting (machine readable)
  machineDate: dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  },

  // Universal filters (Adds to Liquid, Nunjucks, and Handlebars)
  cacheBuster: value => {
    let milliseconds = Date.now();
    return value + "?rev=" + milliseconds;
  },

  // Sorting alphabetically
  sortBy: (collection, type, child) => {
		return collection.sort(function(a, b) {
      let first = a[type];
      let second = b[type];

      if (child) {
        first = a[child][type];
        second = b[child][type];  
      }

      if(first < second) { return -1; }
      if(first > second) { return 1; }
      return 0;
		});
  },

  uniqueCountry: collection => {
    const countries = [];
    
    return collection.filter(item =>  { 
      // console.log(countries.indexOf(item.data.country))
      
      if (countries.indexOf(item.data.country) === -1) {
        countries.push(item.data.country);
        return item.data.country;
      }
    });
  }
};
