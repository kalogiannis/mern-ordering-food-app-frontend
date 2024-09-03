import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};




//25
// import { useQuery } from "react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useSearchRestaurants = (
//   city?: string
// ) => {
//   const createSearchRequest = async () => {
  
//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/search/${city}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: results, isLoading } = useQuery(
//     ["searchRestaurants",],
//     createSearchRequest,
//     { enabled: !!city }
//   );

//   return {
//     results,
//     isLoading,
//   };
// };







//33
// import {  RestaurantSearchResponse } from "@/types";
// import { useQuery } from "react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useSearchRestaurants = (city?: string) => {
//   const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {

//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/search/${city}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: results, isLoading } = useQuery(
//     ["searchRestaurants"],
//     createSearchRequest,
//     { enabled: !!city }
//   );

//   return {
//     results,
//     isLoading,
//   };
// };







//36
// import { SearchState } from "@/pages/SearchPage";
// import { RestaurantSearchResponse } from "@/types";
// import { useQuery } from "react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useSearchRestaurants = (
//   searchState: SearchState,
//   city?: string
// ) => {
//   const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
//     const params = new URLSearchParams();
//     params.set("searchQuery", searchState.searchQuery);
//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: results, isLoading } = useQuery(
//     ["searchRestaurants", searchState],
//     createSearchRequest,
//     { enabled: !!city }
//   );

//   return {
//     results,
//     isLoading,
//   };
// };








//39
// export const useSearchRestaurants = (
//   searchState: SearchState,
//   city?: string
// ) => {
//   const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
//     const params = new URLSearchParams();
//     params.set("searchQuery", searchState.searchQuery);
//     params.set("page", searchState.page.toString());

//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
//     );
//     .......








//44
// export const useSearchRestaurants = (
//   searchState: SearchState,
//   city?: string
// ) => {
//   const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
//     const params = new URLSearchParams();
//     params.set("searchQuery", searchState.searchQuery);
//     params.set("page", searchState.page.toString());
//     params.set("selectedCuisines", searchState.selectedCuisines.join(","));
//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }   ......

