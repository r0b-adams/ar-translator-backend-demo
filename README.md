# ar-vision-translator-backend-demo

Update coming soon...

## Endpoints

### GET /translateAPI/languages

Fetch languages from the Google Translate API

Returns an array of objects describing languages and their [two-letter codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### POST /translateAPI/translate

Fetch a translation of text from a source language to a target language

Returns a string of translated text

### POST /visionAPI/objects

Fetch recognized objects and metadata from the Google Vision API

Returns array of recognized objects and normalized bounding-box verticies
