import { z } from 'zod';
import { patchUserSchema, userSchema } from './schemas';

export type User = z.infer<typeof userSchema>;

export type PatchUser = z.infer<typeof patchUserSchema>;
