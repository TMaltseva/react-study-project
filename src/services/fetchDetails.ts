export const fetchDetails = (id: string) => {
  return fetch(`https://swapi.dev/api/people/${id}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
};
