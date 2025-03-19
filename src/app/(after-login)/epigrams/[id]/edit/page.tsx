'use client';

import Header from '@/components/ui/header/MainHeader';
import Button from '@/components/ui/buttons/index';
import { Pretendard } from '@/fonts';
import Content from '@/components/edit/Content';
import Author from '@/components/edit/Author';
import Source from '@/components/edit/Source';
import Tags from '@/components/edit/Tags';
import { useState } from 'react';

// 목데이터로 임시 작업했습니다. 추후 api 작업에서 변경하겠습니다. 
const mockData = {
  content: '목데이터 용 내용입니다 .',
  author: '정재형',
  source: '유튜브',
  tags: ['에픽그램', '수정', '예시'],
};

export default function EpigramEdit() {
  const [content, setContent] = useState(mockData.content);
  const [author, setAuthor] = useState(mockData.author);
  const [source, setSource] = useState(mockData.source);
  const [tags, setTags] = useState(mockData.tags);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (value: string) => {
    setAuthor(value); 
  };

  const handleSourceChange = (value: string) => {
    setSource(value); 
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags); 
  };

  return (
    <>
      <Header />
      <div className='pt-14'>
        <div className='mx-auto mt-[21px] flex h-196.25 w-78 flex-col gap-6 md:mt-9 md:h-202.75 md:w-[calc(100%-360px)] md:gap-8 xl:mt-20 xl:h-278.5 xl:w-160 xl:gap-10'>
          <p className={`h-6.5 w-full md:h-8 ${Pretendard.className} text-lg font-semibold md:text-xl xl:text-2xl`}>에픽그램 수정</p>
          <div className='flex h-165.75 w-full flex-col gap-10 md:h-168.75 xl:h-234.5 xl:gap-13.5'>
            <Content content={content} onChange={handleContentChange} />
            <Author author={author} onAuthorChange={handleAuthorChange} />
            <Source source={source} onSourceChange={handleSourceChange} />
            <Tags tags={tags} onTagsChange={handleTagsChange} />
          </div>
          <Button className='bg-black-500 h-12 w-full xl:h-16'>수정 완료</Button>
        </div>
      </div>
    </>
  );
}
