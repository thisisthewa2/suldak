"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Liquor } from "models/liquor";
import { useLiquorSearch } from "apis/liquor/useLiquorSearch";
import { useGetRecommendKeyword } from "apis/keyword/useGetRecommendKeyword";
import SearchInput from "components/liquor/search/SearchInput";
import SortDropDown from "components/liquor/search/SortDropDown";
import LiquorCard from "components/shared/LiquorCard";
import FilterButton from "components/liquor/search/FilterButton";
import NoResultSection from "components/liquor/search/section/NoResultSection";
import LoadingCard from "components/shared/LiquorCard/LoadingCard";
import HeadBackIcon from "assets/icons/ico-head-back.svg";

interface RecommendKeyword {
  id: number;
  isActive: boolean;
  text: string;
}

function SearchParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}

function RecommendSection({
  keywords,
  onClick,
}: {
  keywords: RecommendKeyword[];
  onClick: (keyword: string) => void;
}) {
  return (
    <section className="border-b border-suldak-gray-200">
      <div className="flex items-center gap-2 px-[20px] py-3.5">
        <span className="text-sm font-semibold text-suldak-gray-900">추천</span>
        {keywords.length > 0 && (
          <>
            <div className="text-suldak-gray-500">|</div>
            <div className="flex items-center gap-4 text-sm font-semibold text-suldak-mint-500">
              {keywords.slice(0, 3).map((keyword: RecommendKeyword) => (
                <span
                  key={keyword.id}
                  onClick={() => onClick(keyword.text)}
                  className="cursor-pointer"
                >
                  {keyword.text}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function SearchInfoSection({
  count,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="h-[44px] px-[20px]">
      <div className="flex items-center justify-between pt-3.5">
        <span className="text-xs font-medium text-suldak-gray-600">
          총 {count}종
        </span>
        <div className="flex items-center gap-3 text-sm font-medium leading-5 text-suldak-gray-600">
          {children}
        </div>
      </div>
    </section>
  );
}

function LiquorList({ liquors }: { liquors: Liquor[] }) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-y-2.5">
      {liquors.map((liquor: Liquor) => (
        <LiquorCard
          key={liquor.id}
          imgUrl={liquor.liquorPictureUrl}
          liquorId={liquor.id}
          liquorDetail={liquor.summaryExplanation}
          liquorAbv={liquor.detailAbv}
          name={liquor.name}
          liquorSellDtos={liquor.liquorSellDtos}
          liquorSnackRes={liquor.liquorSnackRes}
          tasteTypeDtos={liquor.tasteTypeDtos}
        />
      ))}
    </section>
  );
}

function LiquorSearchContent({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const router = useRouter();
  const { data, isLoading, error } = useLiquorSearch(
    {
      tag: searchParams.get("q") || undefined,
      isRecommend: searchParams.get("isRecommend") || "인기순",
      liquorNamePriKeys: searchParams.get("class") || "",
      tastePriKeys: searchParams.get("taste") || "",
      liquorAbvPriKeys: searchParams.get("abv") || "",
      sellPriKeys: searchParams.get("seller") || "",
      recordSize: 100, // 최대 100개 까지의 목록을 가져옵니다.
      liquorDetailPriKeys: searchParams.get("subKey") || "",
    },
    searchParams.toString(),
  );

  const { data: recommendKeywords } = useGetRecommendKeyword();

  const liquors: Liquor[] = data?.data.content || [];
  const keywords: RecommendKeyword[] = recommendKeywords || [];
  const liquorSubKey = searchParams.get("subKey");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleKeywordClick = (keyword: string) => {
    router.push(`/liquor/search/result?q=${encodeURIComponent(keyword)}`);
  };

  if (error) {
    return (
      <main className="flex min-h-screen flex-col">
        <SearchInput />
        <div className="flex flex-grow items-center justify-center">
          <p>오류가 발생했습니다. 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }
  const handleBackHome = () => {
    router.push(`/`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touchEndX = e.touches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 100) {
      // 스와이프 거리가 100px 이상일 때만 동작
      handleBackHome();
      setTouchStartX(null); // 스와이프 처리 후 초기화
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null); // 터치 종료 시 초기화
  };

  return (
    <main
      className="flex min-h-screen flex-col pb-[10px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!liquorSubKey && (
        <div className="flex items-center justify-center gap-x-[8px] pl-[12px] pr-[20px] pt-[2px]">
          <HeadBackIcon onClick={handleBackHome} />
          <SearchInput />
        </div>
      )}
      {!liquorSubKey && (
        <RecommendSection keywords={keywords} onClick={handleKeywordClick} />
      )}
      {!liquorSubKey && (
        <SearchInfoSection count={isLoading ? 0 : liquors.length}>
          <SortDropDown />
          <FilterButton />
        </SearchInfoSection>
      )}
      {liquorSubKey && (
        <SearchInfoSection count={isLoading ? 0 : liquors.length}>
          <div />
        </SearchInfoSection>
      )}
      {isLoading ? (
        <section className="flex flex-col items-center justify-center gap-2.5 overflow-y-auto px-[20px]">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : liquors.length === 0 ? (
        <NoResultSection />
      ) : (
        <LiquorList liquors={liquors} />
      )}
    </main>
  );
}

function LiquorSearchResultPage() {
  return (
    <Suspense fallback>
      <SearchParamsHandler>
        {(searchParams) => <LiquorSearchContent searchParams={searchParams} />}
      </SearchParamsHandler>
    </Suspense>
  );
}

export default LiquorSearchResultPage;
