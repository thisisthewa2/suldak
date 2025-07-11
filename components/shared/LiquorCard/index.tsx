import Image from "next/image";
import { CardProps } from "./types";
import LiquorTag from "./LiquorTag";
import { useRouter } from "next/navigation";
import DefaultImg from "assets/pngs/image-default-alchol.png";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function LiquorCard({
  imgUrl,
  liquorId,
  liquorDetail,
  liquorAbv,
  name,
  liquorSellDtos,
  liquorSnackRes,
  tasteTypeDtos,
}: CardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/liquor/detail/${liquorId}`);
  };

  // 모든 태그를 하나의 배열로 결합
  const allTags = [
    ...liquorSellDtos,
    ...liquorSnackRes,
    ...(tasteTypeDtos?.map((tag) =>
      "tagName" in tag ? { name: tag.tagName } : tag,
    ) || []),
  ]
    .filter((item) => item?.name)
    .slice(0, 3); // 최대 3개로 제한

  // DefaultImg를 import한 경우, 해당 이미지의 실제 경로를 가져와야 합니다
  const defaultImgSrc = DefaultImg?.src || DefaultImg;

  // imgUrl이 falsy(undefined, null, empty string)인 경우 defaultImgSrc 사용
  const imageSource =
    imgUrl && imgUrl.trim() ? `${BASE_URL}${imgUrl}` : defaultImgSrc;

  return (
    <div
      className="flex h-[140px] w-[335px] cursor-pointer items-center text-wrap rounded-[16px] bg-white p-[18px] text-black shadow-suldak-card"
      onClick={handleClick}
    >
      <div className="h-20 w-20 flex-shrink-0 mobile:mr-4 mobile:h-24 mobile:w-24">
        <Image
          className="h-full w-full rounded-full object-cover"
          src={imageSource}
          alt="술 이미지"
          width={96}
          height={96}
          loading="lazy"
        />
      </div>

      <div className="flex min-w-0 flex-grow flex-col">
        <p className="text-[12px] font-medium text-suldak-orange-500">
          ALC {liquorAbv}%
        </p>
        <p className="truncate text-[16px] font-semibold text-suldak-gray-900">
          {name || "Name None"}
        </p>
        <p className="mt-[2px] text-xs text-suldak-gray-600 mobile:text-[14px]">
          {liquorDetail || "주류 정보 추가 예정입니다."}
        </p>
        <div className="mt-2 flex gap-1">
          {allTags.map((tag, index) => (
            <LiquorTag key={index} name={tag.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiquorCard;
