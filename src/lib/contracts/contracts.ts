import { z } from 'zod';

export const GSWByStateSchema = z.object({
  state: z.string(),
}).catchall(z.number()); // create year typing by allowing any string key with a number value

export type DeathsByStateRecord = z.infer<typeof GSWByStateSchema>;

export type InjuriesByStateRecord = z.infer<typeof GSWByStateSchema>;