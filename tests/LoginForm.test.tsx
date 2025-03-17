import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/auth/LoginForm';
import QueryClientProvider from '@/apis/QueryProvider';
import { ReactNode } from 'react';

const renderWithQueryClient = (ui: ReactNode) => {
  return render(<QueryClientProvider>{ui}</QueryClientProvider>);
};

describe('LoginForm', () => {
  test('이메일 필드가 비어있을 때 blur 시 필수 입력 오류 메시지를 표시한다', async () => {
    renderWithQueryClient(<LoginForm />);
    const emailInput = screen.getByTestId('email-input-login');
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);

    expect(await screen.findByText('이메일은 필수 입력입니다.')).toBeInTheDocument();
  });

  test('이메일 형식이 아닌 상태에서 blur 시 형식 오류 메시지를 표시한다', async () => {
    renderWithQueryClient(<LoginForm />);
    const emailInput = screen.getByTestId('email-input-login');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText('이메일 형식으로 작성해 주세요.')).toBeInTheDocument();
  });

  test('비밀번호 필드가 비어있을 때 blur 시 필수 입력 오류 메시지를 표시한다', async () => {
    renderWithQueryClient(<LoginForm />);

    const passwordInput = screen.getByTestId('password-input-login');
    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText('비밀번호는 필수 입력입니다.')).toBeInTheDocument();
  });

  test('모든 유효성 검사가 통과하면 제출 버튼이 활성화된다', async () => {
    renderWithQueryClient(<LoginForm />);

    const submitButton = screen.getByTestId('login-button');
    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByTestId('email-input-login');
    const passwordInput = screen.getByTestId('password-input-login');

    await userEvent.type(emailInput, 'valid@example.com');
    await userEvent.type(passwordInput, 'Password123!');

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
