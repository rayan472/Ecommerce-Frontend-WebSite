import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
    products: [],
    searchTerm: '',
    filteredData: []
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            state.filteredData = state.products.filter(product =>
                product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
        }
    },
});

export const { setProducts, setSearchTerm } = productsSlice.actions;
export const selectProducts = (state) => state.products.products;



export default productsSlice.reducer;
