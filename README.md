# ar-translator-server

## Table of Contents

- [Authorization endpoints](#authorization)
- [Translation endpoints](#translation)
- [Vision endpoints](#vision)
- [JWT authorization](#tokens)

---

## Authorization

#### **GET /auth/users**

Get a single user's profile

- _[Requires authorization](#tokens)_

Request Body: _n/a_

JSON Response schema:

```
{
	profile: {
		username,
		email
	}
}
```

| property | description                         |
| -------: | ----------------------------------- |
|  profile | object containing user profile data |

#### **POST /auth/register**

Create a new user account.

Request Body schema:

```
{
	username,
	password,
	email
}
```

| property | description                  |
| -------: | ---------------------------- |
| username | username for the new account |
| password | password for the new account |
|    email | email for the new account    |

JSON Response schema:

```
{
	token,
	profile: {
		username,
		email
	}
}
```

| property | description                                     |
| -------: | ----------------------------------------------- |
|    token | JSON web token for authentication/authorization |
|  profile | object containing created user profile data     |

#### **POST /auth/login**

Login to an existing user account.

Request Body schema:

```
{
	username,
	password
}
```

| property | description               |
| -------: | ------------------------- |
| username | existing account username |
| password | existing account password |

JSON Response schema:

```
{
	token,
	profile: {
		username,
		email
	}
}
```

| property | description                                     |
| -------: | ----------------------------------------------- |
|    token | JSON web token for authentication/authorization |
|  profile | object containing user profile data             |

#### **DELETE /auth/logout**

Log out of an existing user account.

- _[Requires authorization](#tokens)_

Request Body schema:: _n/a_

JSON Response schema:

```
{
  message: 'logged out successfully!'
}
```

---

## Translation

#### **GET /translateAPI/languages**

Get a list of all [languages supported](https://cloud.google.com/translate/docs/languages) by the Google Translate API.

- _[Requires authorization](#tokens)_

Request Body schema: _n/a_

JSON Response schema:

```
[
  {
    code,
    name
  },
  ...
]
```

| property | description                                                                                  |
| -------: | -------------------------------------------------------------------------------------------- |
|     code | language code conforming to [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) identifiers |
|     name | The English exonym for the language                                                          |

#### **POST /translateAPI/translate**

- _[Requires authorization](#tokens)_

**Request Body schema:**

```
{
	"text": "Where is the library, Pedro?",
	"from": "en",
	"to": "es"
}
```

| property | description                                                                                                   |
| -------: | ------------------------------------------------------------------------------------------------------------- |
|     text | Text to be translated from source language to target language                                                 |
|     from | source language: language code conforming to [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) identifiers |
|       to | target language: language code conforming to [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) identifiers |

**JSON Response schema:**

```
{
	"result": "¿Dónde está la biblioteca, Pedro?"
}
```

| property | description         |
| -------: | ------------------- |
|   result | the translated text |

---

## Vision

#### **POST /visionAPI/objects**

- _[Requires authorization](#tokens)_

Request Body schema:

```
{
  img,
  to
}
```

| property | description                                                                                                   |
| -------: | ------------------------------------------------------------------------------------------------------------- |
|      img | data URL with syntax: data:image/jpeg;base64,[*data*]                                                         |
|       to | target language: language code conforming to [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) identifiers |

JSON Response:

```
    {
      boundingPoly: {
        normalizedVertices: [
          {
            x,
            y
          },
          {
            x,
            y
          },
          {
            x,
            y
          },
          {
            x,
            y
          },
        ]
      },
      mid,,
      name,
      score,
      trgLangCode,
      translatedName,
    },
    ...
```

|                         property | description                                                                                                   |
| -------------------------------: | ------------------------------------------------------------------------------------------------------------- |
| boundingPoly.normalizedVerticies | list of 4 sets of (x,y) coordinates corresponding to normalized verticies of a box circumscribing the object  |
|                              mid | Google Vision API object id                                                                                   |
|                             name | name of the object (e.g. 'bicycle')                                                                           |
|                            score | confidence level of the result expressed as a percentage                                                      |
|                      trgLangCode | target language: language code conforming to [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) identifiers |
|                   translatedName | object name translated to given target language                                                               |

---

## Tokens

Most routes will require authorization via a [JSON web token](https://jwt.io/) (JWT)

The authorization header in the request must be set to a string of the scheme:

`Bearer <token>`

where 'token' is a valid JWT returned from the server on a successful login or registration.
