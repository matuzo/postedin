var countries = document.querySelector('.js-countries');
var selected_country = countries.options[countries.selectedIndex].value;

var cities = document.querySelector('.js-cities');
var city = cities.querySelectorAll('option');
var all_cities = city;

function getPageContent(e) {
  var request = new XMLHttpRequest();
  var selected_city = e ? e.target.value : document.querySelectorAll('[data-country="' + selected_country + '"]')[0].value;
  var url = site_root + '/' + selected_country + '/' + selected_city + '/';
  var page_content = document.querySelector('.js-page-content');
  var resp = '';

  request.open('GET', url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      resp = this.response;
    } else {
      resp = 'Sorry, there\'s no data associated with this city :(';
    }
    page_content.innerHTML = resp;
    var heading = page_content.querySelector('h2');
    var city = page_content.querySelector('h2').textContent;
    heading.textContent = '';
    heading.setAttribute('role', 'alert');
    heading.setAttribute('aria-live', 'assertive');
    document.title = "Articles posted in " + city;
    heading.innerHTML = "<span class='visually-hidden'>Articles posted in</span>&nbsp;" + city;
  };

  request.onerror = function() {
    page_content.innerHTML = 'For some reason I couldn\'t connect to the server, please try later again.';
  };

  request.send();
}

function updateCities() {
  cities.innerHTML = '';
  for (var i = 0; i < all_cities.length; i++) {
    var city = all_cities[i];
    if (city !== undefined) {
      cities.appendChild(city)
    } 
  }

  city = cities.querySelectorAll('.js-cities option')
  for (var i = 0; i < city.length; i++) {
    if (city[i].dataset.country !== selected_country) {
      city[i].remove();
    }
  }
}

countries.addEventListener('change', function(e) {
  selected_country = e.target.value;
  var first_city = document.querySelectorAll('[data-country="' + selected_country + '"]')[0]
  cities.selectedIndex = [].indexOf.call(city, first_city);
  updateCities();
  getPageContent();
});

cities.addEventListener('change', getPageContent);

updateCities();
getPageContent();
