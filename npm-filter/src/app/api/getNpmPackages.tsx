async function getData(filter: string) {
  const response = fetch(
    "https://api.npms.io/v2/search/suggestions?q=" + filter
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function getMovies(filter: string) {
  const data = await getData(filter);
  return data;
}
