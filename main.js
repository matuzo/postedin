var countries = document.querySelector('.js-countries');
var selected_country = countries.options[countries.selectedIndex].value;

var cities = document.querySelector('.js-cities');
var city = cities.querySelectorAll('option');

function getPageContent(e) {
  var request = new XMLHttpRequest();
  var selected_city = e ? e.target.value : document.querySelectorAll('[data-country="' + selected_country + '"]')[0].value;
  var url = site_root + '/' + selected_country + '/' + selected_city;
  var page_content = document.querySelector('.js-page-content');
  var resp = '';

  console.log(url)

  axios.get(url)
  .then(function (response) {
    resp = response.data;
    page_content.innerHTML = resp;

  })
  .catch(function (error) {
    page_content.innerHTML = 'Sorry, there\'s no data associated with this city :(';
  });
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
