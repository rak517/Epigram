import AddEpigramForm from '@/components/form/AddEpigramForm';
// import { MakeEpigramApiRequest } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// const mockCreateEpigram = jest.fn();
// jest.mock('@/에피그램 api 호출 경로', () => ({
//   createEpigram: (data: MakeEpigramApiRequest) => mockCreateEpigram(data),
// }));

describe('AddEpigram Component', () => {
  beforeEach(() => {
    // mockCreateEpigram.mockClear();
    render(<AddEpigramForm />);
  });

  test('에피그램 추가폼을 불러온다', () => {
    expect(screen.getByText('에피그램 만들기')).toBeInTheDocument();

    expect(screen.getByText('내용')).toBeInTheDocument();
    expect(screen.getByText('저자')).toBeInTheDocument();
    expect(screen.getByText('출처')).toBeInTheDocument();
    expect(screen.getByText('태그')).toBeInTheDocument();

    expect(screen.getByText('작성 완료')).toBeInTheDocument();
  });

  test('내용 필드가 비어있을 때 blur시 필수 입력 오류 메시지를 표시한다', async () => {
    const contentInput = screen.getByPlaceholderText('500자 이내로 입력해주세요.');
    fireEvent.focus(contentInput);
    fireEvent.blur(contentInput);

    expect(await screen.findByText('내용을 입력해주세요.')).toBeInTheDocument();
  });

  test('저자 필드가 비어있을 때 blur시 필수 입력 오류 메시지를 표시한다.', async () => {
    const authorInput = screen.getByPlaceholderText('저자 이름 입력');
    fireEvent.focus(authorInput);
    fireEvent.blur(authorInput);

    expect(await screen.findByText('저자 이름을 입력해주세요')).toBeInTheDocument();
  });

  test('저자 유형 변경에 따른 폼 변화를 확인한다', async () => {
    const directAuthorOption = screen.getByLabelText('직접 입력');
    const unknownAuthorOption = screen.getByLabelText('알 수 없음');
    const selfAuthorOption = screen.getByLabelText('본인');

    expect(directAuthorOption).toBeChecked();

    expect(screen.getByPlaceholderText('저자 이름 입력')).toBeInTheDocument();

    await userEvent.click(unknownAuthorOption);
    expect(unknownAuthorOption).toBeChecked();
    expect(screen.queryByPlaceholderText('저자 이름 입력')).not.toBeInTheDocument();

    await userEvent.click(selfAuthorOption);
    expect(selfAuthorOption).toBeChecked();
    expect(screen.queryByPlaceholderText('저자 이름 입력')).not.toBeInTheDocument();

    await userEvent.click(directAuthorOption);
    expect(directAuthorOption).toBeChecked();
    expect(screen.getByPlaceholderText('저자 이름 입력')).toBeInTheDocument();
  });

  test('태그가 3개를 초과하면 추가 버튼이 비활성화된다', async () => {
    const tagInput = screen.getByPlaceholderText('입력하여 태그 작성 (최대 10자)');
    const addTagButton = screen.getByText('추가');

    await userEvent.type(tagInput, '태그1');
    expect(addTagButton).not.toBeDisabled();
    await userEvent.click(addTagButton);
    expect(screen.getByText('태그1')).toBeInTheDocument();

    await userEvent.type(tagInput, '태그2');
    expect(addTagButton).not.toBeDisabled();
    await userEvent.click(addTagButton);
    expect(screen.getByText('태그2')).toBeInTheDocument();

    await userEvent.type(tagInput, '태그3');
    expect(addTagButton).not.toBeDisabled();
    await userEvent.click(addTagButton);
    const moreButton = screen.getByText(/\+1개 더보기/);
    await userEvent.click(moreButton);
    expect(screen.getByText('태그3')).toBeInTheDocument();

    expect(addTagButton).toBeDisabled();

    expect(screen.getByText('태그는 최대 3개까지 추가할 수 있습니다')).toBeInTheDocument();
  });

  //원래는 필수입력요소인 내용, 저자만 있으면 통과이지만, 다른것도 다 넣어서 테스트 해봤습니다.
  test('모든 유효성 검사가 통과하면 제출 버튼이 활성화된다', async () => {
    const submitButton = screen.getByText('작성 완료');
    expect(submitButton).toBeDisabled();

    const contentInput = screen.getByPlaceholderText('500자 이내로 입력해주세요.');
    const authorInput = screen.getByPlaceholderText('저자 이름 입력');
    const sourceTitleInput = screen.getByPlaceholderText('출처 제목 입력');
    const sourceUrlInput = screen.getByPlaceholderText('URL (ex. https://www.website.com/)');
    const tagInput = screen.getByPlaceholderText('입력하여 태그 작성 (최대 10자)');
    const addTagButton = screen.getByText('추가');

    await userEvent.type(contentInput, '테스트 에피그램 내용');
    await userEvent.type(authorInput, '테스트 저자');
    await userEvent.type(sourceTitleInput, '테스트 출처');
    await userEvent.type(sourceUrlInput, 'https://www.test.com');
    await userEvent.type(tagInput, '테스트 태그1');
    await userEvent.click(addTagButton);

    expect(submitButton).not.toBeDisabled();
  });
});
