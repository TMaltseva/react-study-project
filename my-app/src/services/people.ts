import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search = '', page = '1' } = req.query;
  const response = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`);
  const data = await response.json();

  res.status(200).json(data);
}
