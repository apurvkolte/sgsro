const filtersReducer = (state, action) => {

    switch (action.type) {
        case 'LOAD_ALL_PRODUCTS':

            const { products, productImages, minPrice, maxPrice } = action.payload;

            return {
                ...state,
                allProducts: products,
                productImages: productImages,
                selectedPrice: {
                    ...state.selectedPrice,
                    price: maxPrice,
                    minPrice: minPrice,
                    maxPrice,
                }
            };


        case 'SET_SORTED_VALUE':
            return {
                ...state,
                sortedValue: action.payload.sortValue
            };


        case 'CHECK_BRANDS_MENU':
            return {
                ...state,
                updatedBrandsMenu: state.updatedBrandsMenu.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            checked: !item.checked
                        };
                    } else {
                        return item;
                    }
                })
            };


        case 'CHECK_CATEGORY_MENU':
            return {
                ...state,
                categoryMenu: action.payload.category,
                updatedCategoryMenu: state.updatedCategoryMenu.map(item => {
                    if (item.category === action.payload.category) {
                        return {
                            checked: !item.checked
                        };
                    }
                })
            };


        case 'HANDLE_PRICE':
            return {
                ...state,
                selectedPrice: {
                    ...state.selectedPrice,
                    price: action.payload.value
                }
            };


        case 'FILTERED_PRODUCTS':
            return {
                ...state,
                allProducts: action.payload.updatedProducts,
            };


        case 'MOB_SORT_VISIBILITY':
            return {
                ...state,
                mobFilterBar: {
                    ...state.mobFilterBar,
                    isMobSortVisible: action.payload.toggle
                }
            };


        case 'MOB_FILTER_VISIBILITY':
            return {
                ...state,
                mobFilterBar: {
                    ...state.mobFilterBar,
                    isMobFilterVisible: action.payload.toggle
                }
            };


        case 'CLEAR_FILTERS':
            return {
                ...state,
                sortedValue: null,
                categoryMenu: null,
                selectedPrice: state.selectedPrice,
            };

        default:
            return state;
    }
};

export default filtersReducer;