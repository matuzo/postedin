# postedin _____

<http://matuzo.github.io/postedin/>

A curated list of web design, web development, accessibility, usability and UX related articles by people from all over the world. Find out what people from your hometown or any other city are writing about.

## Contributing

Do you want to add a city or posts? Awesome! 

There are 3 ways how you can contribute.

1. Add authors and cities yourself (see details below)
2. Create an [issue](https://github.com/matuzo/postedin/issues) and provide me with the following information:  
  Name of the author  
  Link to their blog (optional)  
  City  
  Country  
  Post title  
  Link to post  
  Date of publication
3. Send me a DM on [Twitter](http://twitter.com/mmatuzo) with the data above.

### Adding authors and cities

1. Fork the repo
2. Add an author in `src/_data/authors.json` if they don't exist yet.
  ```
  {
    "key": uniqueslug,
    "name": Name,
    "url": "Link to blog or social media"
  }
  ```
  For example:
  ```
  {
    "key": "manuelmatuzovic",
    "name": "Manuel Matuzovic",
    "url": "https://matuzo.at"
  }
  ```
3. If you country already exists in `src/places`, skip to step 4 otherwise add a folder with the name of your country, e.g. `usa`.
4. If you city already exists in `src/places/[COUNTRY]`, skip to step 5 otherwise copy `city.njk` to your folder and change `title`, `permalink`, and `country`.
5. Add a new entry in your city file.

```
{
  "title": TITLE,
  "language": LANGUAGE (Only if other than English)
  "link": URL,
  "date": "YYYY-MM-DD
  "author": [authors key] (copied form `src/_data/authors.json`)
}
```

## Running postedin locally

1. Install dependecies
```
npm install
```

2. Run the site
```
npm run start
```
