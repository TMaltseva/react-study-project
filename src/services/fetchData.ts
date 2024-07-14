export const fetchData = (searchTerm: string, page: number = 1) => {
  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => ({
      items: data.results,
      totalPages: Math.ceil(data.count / 10),
    }))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
};
