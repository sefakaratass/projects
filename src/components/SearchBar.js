import React from "react";

const SearchBar = ({searchTerm, setSearchTerm, handleSearch, handleClearResults, showClearButton}) => {
  const onSearch = (e) => {
    e.preventDefault();
    handleSearch();
    setSearchTerm("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="searchInput"
        placeholder="Aradığınız Kitap..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={onSearch} className="searchButton">
        Ara
      </button>
      {showClearButton && (
        <button onClick={handleClearResults} className="clearButton">
          Sonuçları Temizle
        </button>
      )}
    </div>
  );
};

export default SearchBar;