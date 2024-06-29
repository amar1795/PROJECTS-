import { searchProductsByNameOrBrand } from "@/actions/product/findProductbySearch";
import { da } from "@faker-js/faker";
import React, { useState, useEffect, useRef } from "react";

const CustomInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchedData, setsearchedData] = useState([]);
  const containerRef = useRef(null);
  const [lastSelectedSuggestion, setLastSelectedSuggestion] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  console.log("this is the searched value", searchedData);


  console.log("this is the searched data", searchedData);

  useEffect(() => {
    // Load recent searches from localStorage
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Debounce the API call
    setTimeout(async () => {
      if (value.trim() === "") {
        setSuggestions([]);
        setDropdownVisible(false);
        return;
      }

      try {
        const fetchedData = await searchProductsByNameOrBrand(value);
        setSuggestions(fetchedData.map((data) => data.name));
        setDropdownVisible(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 500);
  };

  const handleSuggestionClick = async ({suggestion,recentSearch}) => {
    if(!recentSearch)
      {
        setsearchedData(suggestion);
      }
    setInputValue(suggestion);    
    setDropdownVisible(false); // Close dropdown when suggestion is clicked
    setLastSelectedSuggestion(suggestion); // Remember the last selected suggestion

    // Add to recent searches if not already present
    if (!recentSearches.includes(suggestion)) {
      const updatedRecentSearches = [suggestion, ...recentSearches].slice(
        0,
        10
      ); // Limit to 5 recent searches
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedRecentSearches)
      ); // Save to localStorage immediately
    }
    // Trigger search functionality

    if(recentSearch){
    try {
      const fetchedData = await searchProductsByNameOrBrand(suggestion);
      setSuggestions(fetchedData.map((data) => data.name));
      setDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  const handleInputFocus = () => {
    if (inputValue.trim() === "") {
      // Show recent searches only if input is empty
      setDropdownVisible(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const searchTerm = event.target.value.trim();
      if (searchTerm) {
        // Add to recent searches if not already present
        setRecentSearches((prevSearches) => {
          const newSearches = prevSearches.includes(searchTerm)
            ? prevSearches
            : [searchTerm, ...prevSearches].slice(0, 5); // Limit to 5 recent searches
          localStorage.setItem("recentSearches", JSON.stringify(newSearches));
          return newSearches;
        });
        setDropdownVisible(false); // Close the dropdown after pressing Enter
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        className={`w-[40rem]  outline-none bg-white text-black p-2 border-2 border-black   flex self-center justify-center border-b-8 border-r-4 `}
        placeholder="Search for products,brands and more"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown} // Add this line
      />
      {isDropdownVisible && (
        <div className="absolute bg-white border border-black w-[40rem] mt-2 z-20 max-h-[30rem] overflow-y-auto">
          {inputValue.trim() === "" ? (
            recentSearches.length > 0 ? (
              <>
                <div className="p-2 text-red-500 font-bold">
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200 text-red-500"
                    onClick={() => handleSuggestionClick({suggestion:search,recentSearch:true})}
                  >
                    {search}
                  </div>
                ))}
              </>
            ) : (
              <div className="p-2 text-gray-500">No recent searches</div>
            )
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick({suggestion:suggestion,recentSearch:false})}
              >
                {suggestion}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No products found</div> // Show message when no suggestions
          )}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
