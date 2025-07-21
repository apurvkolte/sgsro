import { createContext, useReducer, useEffect } from 'react';
import commonReducer from './commonReducer';
import { useSelector } from 'react-redux'

// Common-Context
const commonContext = createContext();

// Common-Provider Component
const CommonProvider = ({ children }) => {

    const { user } = useSelector(state => state.auth);


    // Initial State
    const initialState = {
        isFormOpen: false,
        formUserInfo: '',
        isSearchOpen: false,
        searchResults: []
    };
    const [state, dispatch] = useReducer(commonReducer, initialState);

    state.formUserInfo = JSON.stringify(user);

    // Form actions
    const toggleForm = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM',
            payload: { toggle }
        });
    };

    const setFormUserInfo = (info) => {
        return dispatch({
            type: 'SET_FORM_USER_INFO',
            payload: { info }
        });
    };


    // Search actions
    const toggleSearch = (toggle) => {
        return dispatch({
            type: 'TOGGLE_SEARCH',
            payload: { toggle }
        });
    };

    const setSearchResults = (results) => {
        return dispatch({
            type: 'SET_SEARCH_RESULTS',
            payload: { results }
        });
    };

    // Context values
    const values = {
        ...state,
        toggleForm,
        setFormUserInfo,
        toggleSearch,
        setSearchResults
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };