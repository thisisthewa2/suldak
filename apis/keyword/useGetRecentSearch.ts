import axiosInstance from 'apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { ResponseType } from 'apis/api';
import { SearchText } from 'models/searchText';

const getRecentSearch = async (): Promise<ResponseType<SearchText[]>> => {
  const { data } = await axiosInstance.get<ResponseType<SearchText[]>>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/search-text`,
    {
      params: {
        searchType: 'LIQUOR',
      },
    },
  );
  console.log('recent', data);
  return data;
};

export const useGetRecentSearch = () => {
  const queryKey = ['liquor-search'];

  const { data } = useQuery({
    queryKey,
    queryFn: () => getRecentSearch(),
    staleTime: 10000,
  });

  return {
    data: data?.data,
  };
};