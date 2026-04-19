import { Apod } from '../types/Apod';

const API_KEY = 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export async function fetchApodRange(startDate: string, endDate: string): Promise<Apod[]> {
  const url = `${BASE_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: Apod[] = await response.json();
  return data.filter((item) => item.media_type === 'image');
}
