# ar-translator-backend-demo

Demo to check out [Google Translate Node.js Client](https://cloud.google.com/nodejs/docs/reference/translate/latest/translate/v2.translate#_google_cloud_translate_v2_Translate_translate_member_1_)

## Installation

```
git clone https://github.com/r0b-adams/ar-translator-backend-demo.git
npm i
```

Note: A project must be created via the [Google Cloud developer console](https://cloud.google.com/translate/docs/setup) and the Translate and Vision APIs explicitly enabled in order to use. A [service account and JSON key](https://cloud.google.com/translate/docs/setup#creating_service_accounts_and_keys) file are also required. After that, save the JSON key file in the `/google_apis/auth` folder with the name `GOOGLE_APPLICATION_CREDENTIALS.json`. The JSON key file will authenticate both Google Translate and Google Vision APIs.

## Use

Run the following to start the server:

```
nodemon server.js
```

`Ctrl + C` to quit

## Endpoints

### GET /translateAPI/languages

Response: JSON array of objects with shape:
`{ code: string, name: string }`

### POST /translateAPI/translate

Request body: JSON object with shape: `{ "text": string, "to": string, "from": string}`

- text: string to be translated

- to: a [two-letter code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) representing the target language

- from: a [two-letter code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) representing the source language

Response: JSON object with shape `{ "result": string }`

### POST /visionAPI/objects

Note: currently, this endpoint reads an image from disk, converts it to base64 encoding, and sends that data to Google via the Vision Node.js client. Would like to be able to receive base64 data from the client to just forward to Google API.

- Mimics this [guide](https://cloud.google.com/vision/docs/object-localizer)

- Google Vision docs [base64 reference](https://cloud.google.com/vision/docs/base64)
