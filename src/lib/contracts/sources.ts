import { LODESRecord } from './contracts';

export const loadLODES = async (): Promise<LODESRecord[]> => {
  const response = await fetch('/data/lodes.csv');

  if (!response.ok) {
    throw new Error(`Failed to fetch lodes.csv: ${response.statusText}`);
  }
  const csvText = await response.text();
    if (!response.ok) {
      throw new Error(`Failed to fetch lodes.csv: ${response.statusText}`);
    }
  const rows = csvText.trim().split('\n');
  const headers = rows[0]?.split(',') ?? [];

  const LODESjson = rows.slice(1).map((row) => {
    const values = row.split(',');
    const obj = Object.fromEntries(headers.map((key, i) => [key, values[i]]));
    // console.log('obj', obj);

    const record = Object.fromEntries(
      headers.map((key, i) => [key, Number(values[i])]),
    ) as LODESRecord;
    return record;
  });

  return LODESjson;
};