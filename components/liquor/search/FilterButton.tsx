import React from 'react';
import FilterIcon from 'assets/icons/ico-filter-filter.svg';
import { useRouter, useSearchParams } from 'next/navigation';

function FilterButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('filter', 'open');

    // Parallel Routes를 사용하여 필터 페이지로 이동
    router.push(`/liquor/search/result?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <button
      className="flex text-suldak-gray-600 text-[14px] items-center gap-0.5"
      onClick={handleClick}
    >
      <FilterIcon />
      필터
    </button>
  );
}

export default FilterButton;
