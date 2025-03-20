import { useMutation } from '@tanstack/react-query';
import { postImage } from '.';

export const usePostImage = () => {
  return useMutation({
    mutationFn: (form: FormData) => {
      return postImage(form);
    },
  });
};
