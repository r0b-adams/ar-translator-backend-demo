import path from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';

// Google Vision and Translate clients expect a filepath to a JSON file
// containing their credentials. However, we don't want to push our
// keyfile to any repo. One solution is to save key/val pairs in environment
// variables, then gather them into a JSON object and write that to file

// gather data from environment vars
const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
} = process.env;

// write to this path
export const keyFilename = path.join(__dirname, 'data.json');

const credentials = JSON.stringify({
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
});

export const writeCredentials = () => {
  try {
    writeFileSync(keyFilename, credentials);
  } catch (error) {
    console.error(error);

    // make sure file is removed if error
    if (existsSync(keyFilename)) unlinkSync(keyFilename);
  }
};
