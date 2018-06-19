var countries = document.querySelector('.js-countries');
var selected_country = countries.options[countries.selectedIndex].value;

var cities = document.querySelector('.js-cities');
var city = cities.querySelectorAll('option');

function getPageContent(e) {
  var request = new XMLHttpRequest();
  var selected_city = e ? e.target.value : document.querySelectorAll('[data-country="' + selected_country + '"]')[0].value;
  var url = '/' + selected_country + '/' + selected_city;
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
  };

  request.onerror = function() {
    page_content.innerHTML = 'For some reason I couldn\'t connect to the server, please try later again.';
  };

  request.send();
}

function updateCities() {
  for (var i = 0; i < city.length; i++) {
    city[i].removeAttribute('hidden');
    
    if (city[i].dataset.country !== selected_country) {
      city[i].setAttribute('hidden', true);
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
