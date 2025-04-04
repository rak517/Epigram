import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postImage } from '.';
import { patchUser } from '../user';

export const usePostImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: FormData) => {
      const uploadResponse = await postImage(form);
      const imageUrl = uploadResponse.url;

      const patchResponse = await patchUser({ image: imageUrl });

      return patchResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
