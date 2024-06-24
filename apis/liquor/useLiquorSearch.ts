import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { Liquor } from 'models/liquor';

const getLiquorSearch = async (
  tag: string,
  isRecommend: boolean,
): Promise<ResponseType<{ content: Liquor[] }>> => {
  const { data } = await axiosInstance.get<ResponseType<{ content: Liquor[] }>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/liquor/view/liquor-search/`,
    {
      params: {
        searchTag: tag,
        isRecommend: isRecommend,
      },
    },
  );
  return data;
};

export const useLiquorSearch = (tag: string, isRecommend?: string) => {
  const queryKey = tag ? ['liquor-search', tag] : [];

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      getLiquorSearch(tag, isRecommend === '인기순' ? false : true),
  });

  return {
    data: data?.data,
  };
};