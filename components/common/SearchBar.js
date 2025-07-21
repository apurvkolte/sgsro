import React, { useContext, useRef, useState } from "react";
import Link from "next/link";
import commonContext from "../../contexts/common/commonContext";
import useOutsideClose from "../../hooks/useOutsideClose";
import useScrollDisable from "../../hooks/useScrollDisable";
import filtersContext from "../../contexts/filters/filtersContext";
import { Buffer } from "buffer";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from 'next/router';
const SearchBar = () => {
    const router = useRouter();
    const { isSearchOpen, toggleSearch, searchResults, setSearchResults } =
        useContext(commonContext);
    const { allProducts } = useContext(filtersContext);
    const [searchInput, setSearchInput] = useState(""); // Track input value

    const [isSearchVisible, setIsSearchVisible] = useState(false);


    // Handle search visibility toggle (works only on mobile)
    const handleToggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const searchRef = useRef();

    // closing the SearchBar
    const closeSearch = () => {
        toggleSearch(false);
        setSearchResults([]);
        setSearchInput("");
    };

    const handleNavigation = () => {
        toggleSearch(false);
        setSearchResults([]);
        setSearchInput(""); // Clear input on navigation
        router.push({ pathname: '/all-products', query: { keyword: searchInput } });
    };

    useOutsideClose(searchRef, closeSearch);

    useScrollDisable(isSearchOpen);

    // handling Search
    const handleSearching = (e) => {
        const searchedTerm = e.target.value.toLowerCase().trim();
        setSearchInput(searchedTerm);

        const updatedSearchResults = allProducts.filter((item) =>
            item.name.toLowerCase().includes(searchedTerm)
        );

        searchedTerm === ""
            ? setSearchResults([])
            : setSearchResults(updatedSearchResults);
    };

    return (
        <div id="searchbar">
            <div ref={searchRef}>
                <div className="search_box">
                    <div className="search_container">
                        <input
                            type="search"
                            className="input_field searchinput"
                            placeholder="Search for product..."
                            value={searchInput}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNavigation();
                                }
                            }}
                            onChange={handleSearching}
                        />

                        <div className="search_action nav_actions">
                            <button type="button" onClick={handleNavigation} className="btn-primary btn-lg p-3">
                                <AiOutlineSearch />
                            </button>
                            <div className="tooltip">Search</div>
                        </div>
                    </div>
                    {/* <button
                            type="button"
                            className="btn"
                            disabled={searchResults.length === 0}
                        >
                            <AiOutlineSearch />
                        </button> */}
                </div>

                {searchResults.length !== 0 && (
                    <div className="search_results" aria-live="polite">
                        {searchResults.map((item) => {
                            const { id, name, path } = item;
                            const EID = Buffer.from(`${id}`, "binary").toString("base64");

                            return (
                                <div key={id} onClick={closeSearch}>
                                    <Link
                                        href={`/all-products?keyword=${encodeURIComponent(name.toLowerCase().trim())}`}
                                        passHref
                                    >
                                        <a>{name}</a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div >
    );
};

export default React.memo(SearchBar);
