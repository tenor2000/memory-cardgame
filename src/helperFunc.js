export const getInfoFromApi = (id) => {
  const infoUrl = "https://pokeapi.co/api/v2/pokemon/"

  const fetchInfo = async () => {
    const res = await fetch(infoUrl+id);
    if (!res.ok) {
      throw new Error(`Could not fetch ${id}, received ${res.status}`);
    }
    const data = await res.json();
    return data;
  };

  return fetchInfo();
}

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};