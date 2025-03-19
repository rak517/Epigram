import { z } from 'zod';
import { commentFormSchema, commentSchema, commentsResponseSchema, patchCommentSchema } from './schemas';

export type Comment = z.infer<typeof commentSchema>;

export type CommentForm = z.infer<typeof commentFormSchema>;

export type CommentsResponse = z.infer<typeof commentsResponseSchema>;

export type PatchComment = z.infer<typeof patchCommentSchema>;
