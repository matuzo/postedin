var countries = document.querySelector('.js-countries');

var city_select = document.querySelector('.js-cities');
var cities = city_select.querySelectorAll('option');
var all_cities = cities;

var selected_country = '';
var selected_city = '';

function getPageContent(callback) {
  var request = new XMLHttpRequest();
  var request_url = site_root + '/' + selected_country + '/' + selected_city + '/';
  var page_content = document.querySelector('.js-page-content');
  var resp = '';

  request.open('GET', request_url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      resp = this.response;
    } else {
      resp = 'Sorry, there\'s no data associated with this city :(';
    }

    history.pushState({}, selected_city, request_url);

    var container = document.createElement('div');
    container.innerHTML = resp;

    page_content.innerHTML = container.querySelector('.js-page-content').innerHTML;
    var heading = page_content.querySelector('h2');
    var city = page_content.querySelector('h2').textContent;
    heading.textContent = '';
    heading.setAttribute('role', 'status');
    heading.setAttribute('aria-live', 'polite');
    document.title = "Articles posted in " + city;
    heading.innerHTML = "<span class='visually-hidden'>Articles posted in </span>" + city;

    if (callback) callback();
  };

  request.onerror = function() {
    page_content.innerHTML = 'For some reason I couldn\'t connect to the server, please try later again.';
  };

  request.send();
}

function selectCity(e) {
  selected_city = e.target.value;
  getPageContent();
}

function getActiveCountryAndCity() {
  // get city from url or select
  var location_params = location.pathname.split('/');

  if (location_params.length < 4) {
    selected_country = countries.options[countries.selectedIndex].value;
  } else {
    var pathname = location_params.filter(function (param) {
      return param !== "" && param !== 'postedin';
    });

    selected_country = pathname[0];
    selected_city = pathname[1];
  }
}

function updateCitySelect(city) {
  // display only cities for the selected country
  city_select.innerHTML = '';

  // Refill select with all cities
  for (var i = 0; i < all_cities.length; i++) {
    city_select.appendChild(all_cities[i])
  }
  
  // Remove cities from different countries
  cities_in_country = city_select.querySelectorAll('option')
  for (var i = 0; i < cities_in_country.length; i++) {
    if (cities_in_country[i].dataset.country !== selected_country) {
      cities_in_country[i].remove();
    }
  }

  if (city === '' || city === undefined) {
    selected_city = city_select[0].value;
  } else {
    selected_city = city;
  }

  city_select = document.querySelector('.js-cities');

  // set correct country and city
  countries.querySelector(`option[value="${selected_country}"]`).setAttribute('selected', 'selected');
  city_select.querySelector(`option[value="${selected_city}"]`).setAttribute('selected', 'selected');

  // Fixes bug in Firefox and sets correct value
  city_select.value  = city_select.querySelector(`option[value="${selected_city}"]`).value;
}

function switchCountryAndCity() {
  countries.addEventListener('change', function(e) {
    countries.querySelector(`option[selected]`).removeAttribute('selected');
    city_select.querySelector(`option[selected]`).removeAttribute('selected');

    selected_country = e.target.value;
    updateCitySelect();
    getPageContent();
  });

  city_select.addEventListener('change', selectCity);
}

getActiveCountryAndCity();
updateCitySelect(selected_city);
getPageContent();
switchCountryAndCity();
