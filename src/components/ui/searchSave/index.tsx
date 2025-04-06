"use client";

import Chip from "../Chip";

interface Props {
  searches: string[];
  onClear: () => void;
}

export default function SearchSave({ searches, onClear }: Props) {

  return (
    <>
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-10">
        <h3 className="text-lg md:text-xl lg:text-2xl text-black-700">
          최근 검색어
        </h3>
        <button
          className="text-error font-medium cursor-pointer text-xs sm:text-xs md:text-md lg:text-lg"
          onClick={onClear}
        >모두 지우기</button>
      </div>
      {
        searches.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-4 lg:gap-4">
            {searches.map((keyword, index) => (
              <Chip key={index} label={keyword} />
            ))}
          </div>
        )
      }
    </>
  );
}
