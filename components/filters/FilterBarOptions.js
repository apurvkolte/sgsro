import React, { useEffect, useState, useContext } from 'react';
import filtersContext from '../../contexts/filters/filtersContext';
import { sortMenu } from '../../data/filterBarData';
import { displayMoney } from '../../helpers/utils';
import { useRouter } from 'next/router';


const FilterBarOptions = () => {
    const router = useRouter();
    const [cat, setCat] = useState('');
    const {
        sortedValue,
        setSortedValue,
        updatedBrandsMenu,
        updatedCategoryMenu,
        handleBrandsMenu,
        categoryMenu,
        handlePrice,
        selectedPrice: { price, minPrice, maxPrice },
        mobFilterBar: { isMobSortVisible, isMobFilterVisible },
        handleMobSortVisibility,
        handleMobFilterVisibility,
        handleClearFilters,
    } = useContext(filtersContext);

    const displayPrice = displayMoney(price);
    // console.log("updatedCategoryMenu", updatedCategoryMenu);

    const handleCategoryReset = () => {
        setCat('');  // Reset category selection
    };

    // Function to handle price reset on clear filters
    const handlePriceReset = () => {
        // Assuming you want to reset the price slider to its min value
        handlePrice({ target: { value: maxPrice } });  // Reset price to minPrice
    };


    return (
        <>
            {/*===== Clear-Filters btn =====*/}
            {
                <div className="clear_filter_btn">
                    <button
                        type="button"
                        className="btn btn-info text-white"
                        onClick={() => {
                            handleClearFilters();
                            handleCategoryReset();
                            handlePriceReset();
                            router.push('/all-products')
                        }}
                    >
                        Clear Filters
                    </button>
                </div>
            }

            {/*===== Sort-menu =====*/}
            <div className={`sort_options ${isMobSortVisible ? 'show' : ''}`}>
                <div className="sort_head">
                    <h3 className="title">Sort By</h3>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={() => handleMobSortVisibility(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="separator1"></div>

                <ul className="sort_menu">
                    {
                        sortMenu.map(item => {
                            const { id, title } = item;
                            return (
                                <li
                                    key={id}
                                    className={sortedValue === title ? 'active' : ''}
                                    onClick={() => setSortedValue(title)}
                                >
                                    {title}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            {/*===== Filter-menu =====*/}
            <div className={`filter_options ${isMobFilterVisible ? 'show' : ''}`}>
                <div className="filter_head">
                    <h3 className="title">Filter By</h3>
                    <button
                        type="button"
                        className="close_btn"
                        onClick={() => handleMobFilterVisibility(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="separator1"></div>

                {/* Filter by Brands */}
                {/* <div className="filter_block">
                    <h4>Brands</h4>
                    <ul className="filter_menu">
                        {
                            updatedBrandsMenu.map(item => {
                                const { id, checked, label } = item;
                                return (
                                    <li key={id} className="filter_btn">
                                        <input
                                            type="checkbox"
                                            id={label}
                                            value={label}
                                            checked={checked}
                                            onChange={() => handleBrandsMenu(id)}
                                        />
                                        <label htmlFor={label}>{label}</label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div> */}

                {/* Filter by Category */}
                <div className="filter_block">
                    <h4>Category</h4>
                    <ul className="filter_menu">
                        {
                            updatedCategoryMenu.map(item => {
                                var { id, checked, category } = item;
                                return (
                                    <li key={id} className="filter_btn">
                                        <input
                                            type="checkbox"
                                            id={category}
                                            value={category}
                                            checked={cat === category ? true : false}
                                            onClick={() => setCat(category)}
                                            onChange={() => categoryMenu(category)}
                                        />
                                        <label htmlFor={category}>{category}</label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                {/* Filter by Price */}
                <div className="filter_block">
                    <h4>Price</h4>
                    <div className="price_filter">
                        <p>{displayPrice}</p>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={price}
                            onChange={handlePrice}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};

export default FilterBarOptions;