let languages;

const getLanguages = async () => {
  const res = await fetch('/languages');
  const data = await res.json();
  languages = data;
  console.log(languages);
};

window.onload = getLanguages;
