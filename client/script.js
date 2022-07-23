let languages;
let blobURL;

// simple way to preview an image selected by user
// need an <input type="file"> and <img> elements (no src attr)
const input = document.getElementById('input');
const preview = document.getElementById('preview');
input.onchange = (event) => {
  // its best practice to release ObjectURLs when no longer needed, if possible
  // here we revoke the last saved url, if it exists
  if (blobURL) URL.revokeObjectURL(blobURL);

  // make sure that a file was received
  if (event.target.files.length) {
    // get FileList obj; lets you access the list of files selected with the <input type="file"> element.
    // https://developer.mozilla.org/en-US/docs/Web/API/FileList
    // NOTE: <input type="file"> accepts only one file unless the multiple attr is added
    const files = event.target.files;

    // use this URL class static method to create a temp blob path to the uploaded image,
    // passing the File object(s) given by the user
    // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    blobURL = URL.createObjectURL(files[0]);

    // update the src attribute in <img id="preview"> for display
    preview.src = blobURL;

    readImage(files[0]);
  }
};

// NOTE: FileReader is async and event-based
// must provide cb fns for events
// params: file => a File object containing uploaded img data
const reader = new FileReader();
const readImage = (file) => {
  try {
    reader.readAsDataURL(file);
    reader.onload = fetchImageObjects; // fire fetch on successful read
  } catch (error) {
    console.error(error);
  }
};

// receives b64 dataURl (e.g. 'data:image/jpeg;base64, [encodedStr]')
// fetches object data from Google Vision API
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
    console.log(data); // Google API response
  } catch (error) {
    console.error(error);
  }
};

// grab list of supported lanuages from the backend and save to global var
const getLanguages = async () => {
  const response = await fetch('/translateAPI/languages', { method: 'GET' });
  const data = await response.json();
  languages = data;
};

window.onload = getLanguages;
