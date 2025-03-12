import { useState, useEffect } from 'react';
import KeywordCard from '../../components/ui/keywordCard';
import InputComponent from '../../components/ui/Field/Input';

const KeywordCardStory = {
  title: 'Components/KeywordCard',
  component: KeywordCard,
  argTypes: {
    text: { control: 'text' },
    author: { control: 'text' },
    hashtags: { control: 'array' },
    inputText: { control: 'text' },
  },
};

export default KeywordCardStory;

interface KeywordCardStoryArgs {
  text: string;
  author: string;
  hashtags: string[];
  inputText: string;
}

export const Default = (args: KeywordCardStoryArgs) => {
  const [inputText, setInputText] = useState(args.inputText);

  // `inputText`가 `args.inputText`로 변경될 때마다 `inputText` 상태 업데이트
  useEffect(() => {
    setInputText(args.inputText);
  }, [args.inputText]);

  return (
    <div className="space-y-4">
      <InputComponent
        label="Keyword Input"
        value={inputText}  // inputText를 value로 연결
        onChange={(e) => setInputText(e.target.value)}  // inputText 상태 업데이트
        placeholder="Enter keyword to highlight"
      />

      <KeywordCard
        text={args.text}
        author={args.author}
        hashtags={args.hashtags}
        inputText={inputText}  // inputText 전달
      />
    </div>
  );
};

// 기본값 설정
Default.args = {
  text: '예제 글입니다.',
  author: '홍길동',
  hashtags: ['React', 'Storybook', 'test', '한글은?'],
  inputText: '',  // 기본값 설정
};
