# ar-vision-translator-backend-demo

Demo to check out [Google Translate Node.js Client](https://cloud.google.com/nodejs/docs/reference/translate/latest/translate/v2.translate#_google_cloud_translate_v2_Translate_translate_member_1_) and [Google Vision Node.js Client](https://cloud.google.com/nodejs/docs/reference/vision/latest)

## Installation

```
git clone https://github.com/r0b-adams/ar-translator-backend-demo.git
npm i
```

A project must be created via the [Google Cloud developer console](https://cloud.google.com/translate/docs/setup) and the Translate and Vision APIs explicitly enabled in order to use. An associated [service account and JSON key](https://cloud.google.com/translate/docs/setup#creating_service_accounts_and_keys) file are also required. Save the JSON key file in the `/google_apis/auth` folder with the name `GOOGLE_APPLICATION_CREDENTIALS.json`. The JSON key file will authenticate both Google Translate and Google Vision APIs.

## Use

Run the following to start the server:

```
nodemon server.js
```

`Ctrl + C` to quit

Open a browser and enter `localhost:3000` in the URL (your port of choice can be defined in `server.js`).

Select a file to upload

Application will display server JSON response

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
