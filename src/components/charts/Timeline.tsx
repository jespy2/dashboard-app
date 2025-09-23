import { palette } from '@/lib/palette';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    mortalityRate: 2400,
    year: 2000,
  },
  {
    mortalityRate: 1398,
    year: 2012,
  },
  {
    mortalityRate: 9800,
    year: 2015,
  },
  {
    mortalityRate: 2016,
    year: 2016,
  },
  {
    mortalityRate: 3800,
    year: 2018,
  },
  '',
];

export const Timeline = () => {
  return (
    // <ResponsiveContainer width={730} height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          type="number"
          scale="log"
          domain={['dataMin', 'dataMax']}
          ticks={[1975, 2012, 2015, 2016, 2018]}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mortalityRate" stroke={palette.accent} />
      </LineChart>
    // </ResponsiveContainer>
  );
};
