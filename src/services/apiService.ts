// export const fetchData = async (searchTerm: string) => {
//   const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}`);
//   const data = await response.json();
//   return data.results;
// };

export const fetchData = (searchTerm: string) => {
  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.results)
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
};
