let languages;

const getLanguages = async () => {
  const res = await fetch('/languages');
  const data = await res.json();
  languages = data;
};

window.onload = getLanguages;
