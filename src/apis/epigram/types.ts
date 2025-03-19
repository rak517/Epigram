import { z } from 'zod';
import { epigramResponseSchema, tagSchema } from './schemas';

export type Tag = z.infer<typeof tagSchema>;

export type EpigramResponse = z.infer<typeof epigramResponseSchema>;
