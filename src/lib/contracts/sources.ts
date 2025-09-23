import {
  DeathsByStateRecord,
  InjuriesByStateMap,
  InjuriesByStateRecord,
} from './contracts';

export const loadDeathsByState = async (): Promise<DeathsByStateRecord[]> => {
  const response = await fetch('/data/deaths_by_state_1999-2023.csv');

  if (!response.ok) {
    throw new Error(
      `Failed to fetch deaths_by_state_1999-2023.csv: ${response.statusText}`,
    );
  }

  const csvText = await response.text();

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

  const deathsByState = cleanRows.slice(1).map((row) => {
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

  return deathsByState;
};

export const loadInjuriesByState = async (): Promise<
  InjuriesByStateRecord[]
> => {
  const response = await fetch('data/injuries_by_state_2000-2021.csv');
  if (!response.ok) {
    throw new Error(
      `Failed to fetch injuries_by_state_2000-2021.csv: ${response.statusText}`,
    );
  }

  const csvText = await response.text();

  const rows = csvText.trim().split('\n');
  const headers = rows[0]?.split(',');

  // find columns we want
  const stateIdx = headers?.indexOf('state') ?? -1;
  const yearIdx = headers?.indexOf('year') ?? -1;
  const valueIdx = headers?.indexOf('m_pred_nf10k') ?? -1;

  // null/invalid check
  if (stateIdx === -1 || yearIdx === -1 || valueIdx === -1) {
    throw new Error(
      'CSV headers are missing one of: state, year, m_pred_nf10k',
    );
  }
  // Reduce rows into grouped objects
  const injuriesByState = rows.slice(1).reduce((acc, row) => {
    const columns = row.split(',');

    const state = columns[stateIdx];
    const year = Number(columns[yearIdx]);
    const value = parseFloat(columns[valueIdx] ?? '');

    if (!state || Number.isNaN(year) || Number.isNaN(value)) return acc;

    let record = acc.find((r) => r.state === state);
    if (!record) {
      record = { state } as InjuriesByStateRecord;
      acc.push(record);
    }

    record[year] = value;

    return acc;
  }, [] as InjuriesByStateRecord[]);
  console.log('injuriesByState: ', injuriesByState);
  return injuriesByState;
};
