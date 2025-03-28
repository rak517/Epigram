import { z } from 'zod';
import { mypageContextSchema } from './schemas';

export type MypageContext = z.infer<typeof mypageContextSchema>;
