export const fetchData = async (searchTerm: string) => {
  const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
  const data = await response.json();
  return data.results;
};
