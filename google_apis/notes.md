# Notes

## Authentication

Check out this [link](https://github.com/googleapis/google-cloud-node/blob/main/docs/authentication.md) for a good overview of authenticating Google API clients.

In our case, we have a file named `GOOGLE_APPLICATION_CREDENTIALS.json` stored in the `/google_apis/credentials` folder.

A helper function in `/google_apis/credentials/index.js` generates the path to the JSON file that is provided to the Google API client constructor.

Follow [these steps](https://cloud.google.com/vision/docs/before-you-begin) to generate credentials for a project.