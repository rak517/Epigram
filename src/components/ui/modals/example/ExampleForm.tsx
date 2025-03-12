//TODO: 커스텀 모달 샘플 코드이며, 프로젝트 마무리 단계에서 삭제할 예정입니다.

'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../Field/Input';
import Button from '../../buttons';
import { useModalStore } from '@/stores/ModalStore';

async function delay(ms: number, callback: () => void) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      callback();
      return reject('에러 메시지');
    }, ms),
  );
}

const exampleShcema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),
  password: z.string().min(8, '8자리 이상 입력해주세요.'),
});

type ExampleForm = z.infer<typeof exampleShcema>;

export default function ExampleForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<ExampleForm>({
    resolver: zodResolver(exampleShcema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { openModal, closeAllModals } = useModalStore();

  const isDisabled = !isDirty || !isValid || isSubmitting;

  const onSubmit = async (formData: ExampleForm) => {
    openModal({
      type: 'confirm',
      title: '~ 데이터 생성',
      description: '정말 제출하시겠습니까?',
      callback: async () => {
        try {
          await delay(2000, () => console.log(formData));
          reset();
          openModal({
            type: 'alert',
            title: '제출 성공',
            description: '제출 성공했습니다.',
            callback: closeAllModals,
          });
        } catch {
          openModal({
            type: 'alert',
            title: '제출 실패',
            callback: closeAllModals,
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-4 flex w-full flex-col gap-4'>
      <Input label='이메일' error={errors.email?.message} type='email' placeholder='이메일 입력' required {...register('email')} disabled={isSubmitting} />
      <Input label='비밀번호' error={errors.password?.message} type='password' placeholder='비밀번호 입력' required {...register('password')} disabled={isSubmitting} />
      <Button disabled={isDisabled}>제출</Button>
    </form>
  );
}
