import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading ...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;




//23
// import { useParams } from "react-router-dom";

// const SearchPage = () => {
//   const { city } = useParams();

//   return (
//     <span>User searched for {city}</span>
//   );
// };

// export default SearchPage;




//26,27
// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import { useParams } from "react-router-dom";

// const SearchPage = () => {
//   const { city } = useParams();
//   const { results } = useSearchRestaurants( city);
//   return (
//     <span>
//         User searched for {city}{" "}
//         <span>
//           {results?.data.map((restaurant)=>(
//             <span>
//               found - {restaurant.restaurantName}, {restaurant.city}
//             </span>
//           ))}
//         </span>
//     </span>
//   );
// };

// export default SearchPage;






//30
// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import { useParams } from "react-router-dom";

// const SearchPage = () => {
//   const { city } = useParams();
//   const { results, isLoading } = useSearchRestaurants( city);

//   if (isLoading) {
//     <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="cuisines-list">
//         insert cuisines here
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//         <SearchResultInfo total={results.pagination.total} city={city} />
         
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;








//32
// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export type SearchState = {
//   searchQuery: string;
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//   });

//   const { results, isLoading } = useSearchRestaurants( city);

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//     }));
//   };

//   if (isLoading) {
//     <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="cuisines-list">
//         insert cuisines here
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//       <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//         <SearchResultInfo total={results.pagination.total} city={city} />
         
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;









//35
// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import { useState } from "react";
// import { useParams } from "react-router-dom";


// export type SearchState = {
//   searchQuery: string;
// };


// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//   });

//   const { results, isLoading } = useSearchRestaurants(searchState, city);

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//     }));
//   };

//   if (isLoading) {
//     <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="cuisines-list">
//         insert cuisines here
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//       <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//         <SearchResultInfo total={results.pagination.total} city={city} />
         
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;








//38
// import { useParams } from "react-router-dom";

// export type SearchState = {
//   searchQuery: string;
//   page: number;
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1,
//   });

//   const { results, isLoading } = useSearchRestaurants(searchState, city);

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }));
//   };

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//       page: 1,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//       page: 1,
//     }));
//   };

//   if (isLoading) {
//     <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }

  
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="cuisines-list">
//         insert cuisines here
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//       <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//         <SearchResultInfo total={results.pagination.total} city={city} />
         
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//         <PaginationSelector
//           page={results.pagination.page}
//           pages={results.pagination.pages}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;












//40
// export type SearchState = {
//   searchQuery: string;
//   page: number;
//   selectedCuisines: string[];
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1,
//     selectedCuisines: [],
//   });

//   const { results, isLoading } = useSearchRestaurants(searchState, city);

//   const setSelectedCuisines = (selectedCuisines: string[]) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       selectedCuisines,
//       page: 1,
//     }));
//   };

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }));
//   };

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//       page: 1,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//       page: 1,
//     }));
//   };

//   if (isLoading) {
//     <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }
 
  
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="cuisines-list">
//         <CuisineFilter
//           selectedCuisines={searchState.selectedCuisines}
//           onChange={setSelectedCuisines}
//         />
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//         <SearchResultInfo total={results.pagination.total} city={city} />
         
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//         <PaginationSelector
//           page={results.pagination.page}
//           pages={results.pagination.pages}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;









// //43
// export type SearchState = {
//   searchQuery: string;
//   page: number;
//   selectedCuisines: string[];
// };

// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState, setSearchState] = useState<SearchState>({
//     searchQuery: "",
//     page: 1,
//     selectedCuisines: [],
//   });

//   const [isExpanded, setIsExpanded] = useState<boolean>(false);

//   const { results, isLoading } = useSearchRestaurants(searchState, city);


//   const setSelectedCuisines = (selectedCuisines: string[]) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       selectedCuisines,
//       page: 1,
//     }));
//   };

//   const setPage = (page: number) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       page,
//     }));
//   };

//   const setSearchQuery = (searchFormData: SearchForm) => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: searchFormData.searchQuery,
//       page: 1,
//     }));
//   };

//   const resetSearch = () => {
//     setSearchState((prevState) => ({
//       ...prevState,
//       searchQuery: "",
//       page: 1,
//     }));
//   };

//   if (isLoading) {
//     <span>Loading ...</span>;
//   }

//   if (!results?.data || !city) {
//     return <span>No results found</span>;
//   }
 
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//       <div id="cuisines-list">
//         <CuisineFilter
//           selectedCuisines={searchState.selectedCuisines}
//           onChange={setSelectedCuisines}
//           isExpanded={isExpanded}
//           onExpandedClick={() =>
//             setIsExpanded((prevIsExpanded) => !prevIsExpanded)
//           }
//         />
//       </div>
//       <div id="main-content" className="flex flex-col gap-5">
//         <SearchBar
//           searchQuery={searchState.searchQuery}
//           onSubmit={setSearchQuery}
//           placeHolder="Search by Cuisine or Restaurant Name"
//           onReset={resetSearch}
//         />
//         <SearchResultInfo total={results.pagination.total} city={city} />
         
//         {results.data.map((restaurant) => (
//           <SearchResultCard restaurant={restaurant} />
//         ))}
//         <PaginationSelector
//           page={results.pagination.page}
//           pages={results.pagination.pages}
//           onPageChange={setPage}
//         />
//       </div>
//     </div>
//   );
// };
// export default SearchPage;

