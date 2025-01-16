import { useQuery } from "@tanstack/react-query";

export const useFetchData = (key: string, url: string) => {
  return useQuery({
    queryKey: [key], 
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    
    // {
    //   staleTime: 5 * 60 * 1000, // 5 phút, dữ liệu được cache
    //   cacheTime: 10 * 60 * 1000, // 10 phút, thời gian giữ dữ liệu trong cache
    //   retry: 1, // Số lần retry khi fetch thất bại
    // }
});
};
