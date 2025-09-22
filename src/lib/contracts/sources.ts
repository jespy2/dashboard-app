import { DeathsByStateRecord } from './contracts';

export const loadDeathsByState = async (): Promise<DeathsByStateRecord[]> => {
  const response = await fetch('/data/deaths_by_state_1999-2023.csv');

  if (!response.ok) {
    throw new Error(
      `Failed to fetch deaths_by_state_1999-2023.csv: ${response.statusText}`,
    );
  }
  const csvText = await response.text();
  if (!response.ok) {
    throw new Error(
      `Failed to fetch deaths_by_state_1999-2023.csv: ${response.statusText}`,
    );
  }
  
  const rows = csvText.trim().split('\n');

  // find the header line and the last row (Hawaii)
  const startIndex = rows.findIndex((r) => r.startsWith('"Location"'));
  const endIndex = rows.findIndex((r) => r.startsWith('"Hawaii"'));

  // slice out the data
  const cleanRows = rows.slice(startIndex, endIndex + 1);

  // build and clean headers
  const headers = (cleanRows[0]?.split(',') ?? [])
    .map((header) => header.replace(/"/g, '').trim()) // remove quotes
    .filter((header) => header.length > 0 && header !== '000') // drop broken pieces
    .map((header, index) =>
      index === 0 ? 'state' : (header.match(/\d{4}/)?.[0] ?? header),
    ); // update key from 'Location' to 'state'

  const deathsByStatejson = cleanRows.slice(1).map((row) => {
    const values = row.split(',');

    const deathsByStateObj = Object.fromEntries(
      headers.map((key, index) => {
        const raw = values[index] ?? '';

        // cleanup: trim, drop quotes, remove \r
        let value = raw.replace(/"/g, '').replace(/\r/g, '').trim();

        if (key === 'state') {
          // normalize "United States" → "total"
          value = value.toLowerCase() === 'united states' ? 'total' : value;
          return [key, value];
        } else {
          return [key, value === '' ? null : Number(value)];
        }
      }),
    ) as DeathsByStateRecord;

    return deathsByStateObj;
  });

  return deathsByStatejson;
};
