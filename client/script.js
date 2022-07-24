let languages;
let blobURL;

const input = document.getElementById('input');
const preview = document.getElementById('preview');
const output = document.getElementById('output');

input.onchange = (event) => {
  try {
    if (blobURL) URL.revokeObjectURL(blobURL);
    if (event.target.files.length) {
      const files = event.target.files;
      blobURL = URL.createObjectURL(files[0]);
      preview.src = blobURL;
      readImage(files[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

const reader = new FileReader();
const readImage = (file) => {
  try {
    reader.readAsDataURL(file);
    reader.onload = fetchImageObjects;
  } catch (error) {
    console.error(error);
  }
};

const fetchImageObjects = async (e) => {
  try {
    const b64img = e.target.result;
    const response = await fetch('/visionAPI/objects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ img: b64img }),
    });
    const data = await response.json();
    output.textContent = JSON.stringify(data, undefined, 2);
  } catch (error) {
    console.error(error);
  }
};

const getLanguages = async () => {
  const response = await fetch('/translateAPI/languages', { method: 'GET' });
  const data = await response.json();
  languages = data;
};

window.onload = getLanguages;
