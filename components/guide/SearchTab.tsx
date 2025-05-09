import SearchTabImg from "assets/icons/ico-search-tab.svg";
import ResultTabImg from "assets/icons/ico-result-tab.svg";
import FilterTabImg from "assets/icons/ico-filter-tab.svg";
function SearchTab() {
  return (
    <div className="w-full flex-col items-center justify-center">
      <p className="mb-[20px] px-[20px]">
        [홈] 탭의 [검색바]를 통해 여러 술 제품을 찾아보고,
        나에게 맞는 술을 찾을 수 있어요
      </p>
      <div className="flex w-full items-center justify-center">
        <SearchTabImg />
      </div>
      <div className="mb-[40px] px-[20px]">
        <h3 className="mt-[12px] text-[16px] font-semibold text-suldak-mint-500">
          추천 키워드, 랭킹
        </h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            [추천 검색어]로 빠르고 간단하게 지금 마시고 싶은 술을 검색해봐요!
          </li>
          <li>
            [검색 키워드 랭킹]에서는 어떤 키워드가 많이 검색되고 있는지
            실시간으로 알 수 있어요
          </li>
        </ul>
      </div>
      <div className="flex w-full items-center justify-center">
        <FilterTabImg />
      </div>
      <div className="mb-[40px] mt-[12px] px-[20px]">
        <h3 className="text-[16px] font-semibold text-suldak-mint-500">필터</h3>
        <ul className="list-disc space-y-2 pl-[20px]">
          <li className="indent">
            자세한 검색이 필요하다면 [필터]를 이용해 술을 검색해 보세요
          </li>
        </ul>
      </div>
      <div className="flex w-full items-center justify-center">
        <ResultTabImg />
      </div>
      <div className="mb-[20px] mt-[12px] px-[20px]">
        <h3 className="mt-[12px] text-[16px] font-semibold text-suldak-mint-500">
          결과, 제품페이지
        </h3>
        <li>
          제품페이지에는 술에 대한 짧은 소개, 태그, 도수뿐만
          <p className="ml-[18px]">아니라 어울리는 안주도 추천하고 있어요</p>
        </li>
        <li>
          칵테일, 하이볼에는 각각의 레시피와 재료 정보도
          <p className="ml-[18px]">포함하고 있어 직접 만들어 볼 수도 있어요!</p>
        </li>
      </div>
    </div>
  );
}

export default SearchTab;
