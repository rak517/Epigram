import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupForm from '@/components/auth/SignupForm';

describe('SignupForm', () => {
  test('이메일 필드가 비어있을 때 blur 시 필수 입력 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const emailInput = screen.getByTestId('email-input');
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);

    expect(await screen.findByText('이메일은 필수 입력입니다.')).toBeInTheDocument();
  });

  test('이메일 형식이 아닌 상태에서 blur 시 형식 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText('이메일 형식으로 작성해 주세요.')).toBeInTheDocument();
  });

  test('닉네임 필드가 비어있을 때 blur 시 필수 입력 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const nicknameInput = screen.getByTestId('nickname-input');
    fireEvent.focus(nicknameInput);
    fireEvent.blur(nicknameInput);

    expect(await screen.findByText('닉네임은 필수 입력입니다.')).toBeInTheDocument();
  });

  test('닉네임이 20자를 초과할 때 blur 시 글자수 제한 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const nicknameInput = screen.getByTestId('nickname-input');
    fireEvent.change(nicknameInput, {
      target: { value: '이것은매우긴닉네임입니다이것은매우긴닉네임입니다' },
    });
    fireEvent.blur(nicknameInput);

    expect(await screen.findByText('닉네임은 최대 20자까지 가능합니다.')).toBeInTheDocument();
  });

  test('비밀번호 필드가 비어있을 때 blur 시 필수 입력 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const passwordInput = screen.getByTestId('password-input');
    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText('비밀번호는 필수 입력입니다.')).toBeInTheDocument();
  });

  test('비밀번호가 8자 미만일 때 blur 시 길이 제한 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.blur(passwordInput);

    expect(await screen.findByText('비밀번호는 최소 8자 이상입니다.')).toBeInTheDocument();
  });

  test('비밀번호가 숫자, 영문, 특수문자 조합이 아닐 때 blur 시 형식 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: '12345678가' } });
    fireEvent.blur(passwordInput);

    expect(await screen.findByText('비밀번호는 숫자, 영문, 특수문자로만 가능합니다.')).toBeInTheDocument();
  });

  test('비밀번호 확인 필드가 비어있을 때 blur 시 필수 입력 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const passwordConfirmInput = screen.getByTestId('password-confirm-input');
    fireEvent.focus(passwordConfirmInput);
    fireEvent.blur(passwordConfirmInput);

    expect(await screen.findByText('비밀번호 확인을 입력해주세요.')).toBeInTheDocument();
  });

  test('비밀번호 확인이 비밀번호와 일치하지 않을 때 blur 시 불일치 오류 메시지를 표시한다', async () => {
    render(<SignupForm />);

    const passwordInput = screen.getByTestId('password-input');
    const passwordConfirmInput = screen.getByTestId('password-confirm-input');

    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.blur(passwordInput);

    fireEvent.change(passwordConfirmInput, { target: { value: 'DifferentPassword123!' } });
    fireEvent.blur(passwordConfirmInput);

    expect(await screen.findByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
  });

  test('비밀번호 토글 버튼을 누르면 password의 타입이 text로 변한다', async () => {
    render(<SignupForm />);

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const passwordToggle = screen.getByTestId('password-toggle');
    await userEvent.click(passwordToggle);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await userEvent.click(passwordToggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('비밀번호 확인 토글 버튼을 누르면 password-confirm의 타입이 text로 변한다', async () => {
    render(<SignupForm />);

    const passwordConfirmInput = screen.getByTestId('password-confirm-input');
    expect(passwordConfirmInput).toHaveAttribute('type', 'password');

    const passwordConfirmToggle = screen.getByTestId('password-confirm-toggle');
    await userEvent.click(passwordConfirmToggle);
    expect(passwordConfirmInput).toHaveAttribute('type', 'text');

    await userEvent.click(passwordConfirmToggle);
    expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  });

  test('모든 유효성 검사가 통과하면 제출 버튼이 활성화된다', async () => {
    render(<SignupForm />);

    const submitButton = screen.getByTestId('signup-button');
    expect(submitButton).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    const nicknameInput = screen.getByTestId('nickname-input');
    const passwordInput = screen.getByTestId('password-input');
    const passwordConfirmInput = screen.getByTestId('password-confirm-input');

    await userEvent.type(emailInput, 'valid@example.com');
    await userEvent.type(nicknameInput, 'validuser');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(passwordConfirmInput, 'Password123!');

    fireEvent.blur(emailInput);
    fireEvent.blur(nicknameInput);
    fireEvent.blur(passwordInput);
    fireEvent.blur(passwordConfirmInput);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
