# postedin _____

A list of web design and web development related articles by people from all over the world.

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

### Add authors and cities yourself

1. Fork the repo
2. Add an author in `_data/authors.yaml` if they don't exist yet.
  ```
  uniqueslug:
    name: "name"
    url: "Link to blog or social media"
  ```
  For example:
  ```
  manuelmatuzovic:
    name: "Manuel Matuzovic"
    url: "https://twitter.com/mmatuzo"
  ```
3. If you country already exists in `_places`, skip to step 4 otherwise add a folder with the name of your country, e.g. `usa`.
4. If you city already exists in `_places/[COUNTRY]`, skip to step 5 otherwise copy `city.markdown` to your folder and change `title` and `country`.
5. Add a new entry in your city markdownfile.

```
- title: TITLE
  link: URL
  date: YYYY-MM-DD
  author: [AUTHORID] (copied form `_data/authors.yaml`)
```

**Complete example file**

```
---
title: "Berlin"
country: "Germany"
collections:
  - year: "2018"
    posts:
      - title: Faster static site builds Part 1- Process only what you need
        link: https://www.stefanjudis.com/blog/faster-static-site-builds-part-1-process-only-what-you-need/
        date: 2018-05-17
        author: stefanjudis
---

## {{ page.title }}

{%- include posts.html -%}
```
