import { z, ZodSchema } from 'zod';

export const safeResponse = <T extends ZodSchema>(data: unknown, schema: T) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error('서버에서 받은 데이터가 예상과 다릅니다.');
  }

  return result.data as z.infer<T>;
};
