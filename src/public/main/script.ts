let blobURL: string;
const [browserCode] = navigator.language.split('-');

const trgLangSelect = document.getElementById('trg') as HTMLSelectElement;
const input = document.getElementById('input')! as HTMLInputElement;
const preview = document.getElementById('preview') as HTMLImageElement;
const output = document.getElementById('output') as HTMLTextAreaElement;

input.onchange = (_e): void => {
  try {
    // https://developer.mozilla.org/en-US/docs/Web/API/URL#static_methods
    if (blobURL) URL.revokeObjectURL(blobURL); // remove ref to previously uploaded file
    if (input.files) {
      const files = input.files;
      blobURL = URL.createObjectURL(files[0]);
      preview.src = blobURL;
      readImage(files[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
const reader = new FileReader();
const readImage = (file: File): void => {
  try {
    reader.onload = fetchImageObjects;
    reader.readAsDataURL(file);
  } catch (error) {
    console.error(error);
  }
};

const fetchImageObjects = async (
  e: ProgressEvent<FileReader>
): Promise<void> => {
  try {
    if (!e.target) return;
    const b64img = e.target.result;
    const response = await fetch('/visionAPI/objects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ img: b64img, to: trgLangSelect.value }),
    });
    const data = await response.json();
    output.textContent = JSON.stringify(data, undefined, 2);
  } catch (error) {
    console.error(error);
  }
};

type Languages = { languages: any };
const loadLanguages = async () => {
  const response = await fetch('/translateAPI/languages', { method: 'GET' });
  const data: Promise<Languages> = await response.json();
  return data;
};

const populateOptions = async (): Promise<void> => {
  const { languages } = await loadLanguages();

  if (languages.length) {
    for (let i = 0; i < languages.length; i++) {
      const { code, name } = languages[i];

      const trgOpt = document.createElement('option');
      trgOpt.textContent = `${code} - ${name}`;
      trgOpt.value = code;
      trgOpt.setAttribute('data-code', code);
      trgOpt.setAttribute('data-name', name);
      trgLangSelect.append(trgOpt);
    }
  }
  trgLangSelect.value = browserCode;
};

window.onload = async () => await populateOptions();
