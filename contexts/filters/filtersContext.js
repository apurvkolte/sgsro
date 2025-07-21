import { createContext, useEffect, useState, useReducer } from 'react';
import { brandsMenu, categoryMenu } from '../../data/filterBarData';
import filtersReducer from './filtersReducer';
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { getProducts, allCategory, filtersAction, updateProductFilters } from '../../redux/actions/productActions'
// Filters-Context
const filtersContext = createContext();

// Initial State
const initialState = {
    allProducts: [],
    updatedProducts: [],
    sortedValue: null,
    categoryMenu: null,
    updatedBrandsMenu: brandsMenu,
    updatedCategoryMenu: [],
    selectedPrice: {
        price: 0,
        minPrice: 0,
        maxPrice: 0
    },
    mobFilterBar: {
        isMobSortVisible: false,
        isMobFilterVisible: false,
    },
};

// Filters-Provider Component
const FiltersProvider = ({ children }) => {
    const router = useRouter()
    const { category } = useSelector(state => state.allCategory);

    const [state, dispatch1] = useReducer(filtersReducer, initialState);

    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.products)

    var pData = products ? products : [];
    var allCategories = category

    // allCategories?.map((item) => {
    //     Object.assign(item, {
    //         checked: false
    //     })
    // })

    state.allProducts = pData;
    state.updatedCategoryMenu = allCategories ? allCategories : "";



    /* Loading All Products on the initial render */
    useEffect(() => {
        dispatch(getProducts());
        dispatch(allCategory());

    }, [dispatch, error, filtersAction]);

    useEffect(() => {
        if (Object.keys(pData).length != 0) {

            // finding the Max and Min Price, & setting them into the state.
            const priceArr = pData.map(item => item.sale_price);
            const minPrice = Math.min(...priceArr);
            const maxPrice = Math.max(...priceArr);

            filtersAction(pData, minPrice, maxPrice, dispatch1);
        }

    }, [Object.keys(pData).length]);


    /* function for applying Filters - (sorting & filtering) */
    const applyFilters = () => {

        let updatedProducts = [...pData];

        /*==== Sorting ====*/
        if (state.sortedValue) {
            switch (state.sortedValue) {
                case 'Latest':
                    updatedProducts = updatedProducts.slice(0, 6).map(item => item);
                    break;

                case 'Featured':
                    updatedProducts = updatedProducts.filter(item => item.main === 1);
                    break;

                case 'Top Rated':
                    updatedProducts = updatedProducts.filter(item => item.ratings > 4);
                    break;

                case 'Price(Lowest First)':
                    updatedProducts = updatedProducts.sort((a, b) => a.sale_price - b.sale_price);

                    break;

                case 'Price(Highest First)':
                    updatedProducts = updatedProducts.sort((a, b) => b.sale_price - a.sale_price);
                    break;

                default:
                    throw new Error('Wrong Option Selected');
            }
            state.updatedProducts = updatedProducts;

        }

        /*==== Filtering ====*/

        // filter by Brands
        // const checkedBrandItems = state.updatedBrandsMenu.filter(item => {
        //     return item.checked;
        // }).map(item => item.label.toLowerCase());

        // if (checkedBrandItems.length) {
        //     updatedProducts = updatedProducts.filter(item => checkedBrandItems.includes(item.brand.toLowerCase()));
        // }


        // filter by Category
        if (state.categoryMenu) {
            updatedProducts = updatedProducts.filter(item => item.category.includes(state.categoryMenu));
            state.updatedProducts = updatedProducts;

            // allCategories.map((item) => {
            //     if (item.category === state.categoryMenu) {
            //         item.checked = true;
            //     } else {
            //         item.checked = false;
            //     }
            // });
            // state.updatedCategoryMenu = allCategories
            // console.log("state.updatedCategoryMenu", allCategories);
        }



        // if (checkedCategoryItems.length) {
        //     updatedProducts = updatedProducts.filter(item => checkedCategoryItems.includes(item.category.toLowerCase()));
        //     state.updatedProducts = updatedProducts;
        // }

        // filter by Price
        if (state.selectedPrice) {
            updatedProducts = updatedProducts.filter(item => {
                return item.sale_price <= state.selectedPrice.price;
            });
            state.updatedProducts = updatedProducts;

        }

        updateProductFilters(updatedProducts, dispatch1)

    };

    useEffect(() => {
        applyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.sortedValue, state.updatedBrandsMenu, state.updatedCategoryMenu, state.selectedPrice, state.categoryMenu]);



    // Dispatched Actions
    const setSortedValue = (sortValue) => {
        return dispatch1({
            type: 'SET_SORTED_VALUE',
            payload: { sortValue }
        });
    };

    const handleBrandsMenu = (id) => {
        return dispatch1({
            type: 'CHECK_BRANDS_MENU',
            payload: { id }
        });
    };

    const categoryMenu = (category) => {
        return dispatch1({
            type: 'CHECK_CATEGORY_MENU',
            payload: { category }
        });
    };

    const handlePrice = (event) => {
        const value = event.target.value;

        return dispatch1({
            type: 'HANDLE_PRICE',
            payload: { value }
        });
    };

    const handleMobSortVisibility = (toggle) => {
        return dispatch1({
            type: 'MOB_SORT_VISIBILITY',
            payload: { toggle }
        });
    };

    const handleMobFilterVisibility = (toggle) => {
        return dispatch1({
            type: 'MOB_FILTER_VISIBILITY',
            payload: { toggle }
        });
    };

    const handleClearFilters = () => {
        return dispatch1({
            type: 'CLEAR_FILTERS'
        });
    };


    // Context values
    const values = {
        ...state,
        setSortedValue,
        handleBrandsMenu,
        categoryMenu,
        handlePrice,
        handleMobSortVisibility,
        handleMobFilterVisibility,
        handleClearFilters,
    };


    return (
        <filtersContext.Provider value={values}>
            {children}
        </filtersContext.Provider>
    );
};

export default filtersContext;
export { FiltersProvider };