import { z } from 'zod';

export const DeathsByStateSchema = z.object({
  state: z.string,
  1999: z.string,
  2000: z.string,
  2001: z.string,
  2002: z.string,
  2003: z.string,
  2004: z.string,
  2005: z.string,
  2006: z.string,
  2007: z.string,
  2008: z.string,
  2009: z.string,
  2010: z.string,
  2011: z.string,
  2012: z.string,
  2013: z.string,
  2014: z.string,
  2015: z.string,
  2016: z.string,
  2017: z.string,
  2018: z.string,
  2019: z.string,
  2020: z.string,
  2021: z.string,
  2022: z.string,
  2023: z.string,
});

export type DeathsByStateRecord = z.infer<typeof DeathsByStateSchema>;
