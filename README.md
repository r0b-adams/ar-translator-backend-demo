# ar-translator-backend-demo

Demo to check out [Google Translate Node.js Client](https://cloud.google.com/nodejs/docs/reference/translate/latest/translate/v2.translate#_google_cloud_translate_v2_Translate_translate_member_1_)

## Installation

```
git clone https://github.com/r0b-adams/ar-translator-backend-demo.git
npm i
```

Note: A project must be created via the [Google Cloud developer console](https://cloud.google.com/translate/docs/setup) and the Translate API explicitly enabled in order to use.

Create a `.env` file and add the following:

```
GOOGLE_CLOUD_PROJECT_ID=yourProjectId
GOOGLE_CLOUD_PROJECT_KEY=yourApiKey
```

## Use

Run the following to start the server:

```
nodemon server.js
```

`Ctrl + C` to quit

## Endpoints

### GET /languages

Response: JSON array of objects with shape:
`{ code: string, name: string }`

### POST /translate

Request body: JSON object with shape: `{ "text": string, "to": string, "from": string}`

- text: string to be translated

- to: a [two-letter code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) representing the target language

- from: a [two-letter code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) representing the source language

Response: JSON object with shape `{ "result": string }`
