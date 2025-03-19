import { z } from 'zod';
import { epigramSchema, tagSchema } from './schemas';

export type Tag = z.infer<typeof tagSchema>;

export type Epigram = z.infer<typeof epigramSchema>;
