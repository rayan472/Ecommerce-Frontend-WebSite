import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload; 
            const itemIndex = state.products.findIndex(item => item.id === newItem.id);

            if (itemIndex >= 0) {
                state.products[itemIndex].quantity += 1;
                state.products[itemIndex].totalPrice += newItem.price;
            } else {
                state.products.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.image
                });
            }
            state.totalPrice += newItem.price;
            state.totalQuantity += 1;
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const itemIndex = state.products.findIndex(item => item.id === id);

            if (itemIndex >= 0) {
                const itemToRemove = state.products[itemIndex];
                state.totalPrice -= itemToRemove.totalPrice;
                state.totalQuantity -= itemToRemove.quantity;
                state.products = state.products.filter(item => item.id !== id);
            }
        },
        increaseQuantity(state, action) {
            const id = action.payload;
            const itemIndex = state.products.findIndex(item => item.id === id);
            
            if (itemIndex !== -1) { 
                state.products[itemIndex].quantity += 1;
                state.products[itemIndex].totalPrice += state.products[itemIndex].price; 
                state.totalQuantity += 1; 
                state.totalPrice += state.products[itemIndex].price;
            }
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const itemIndex = state.products.findIndex(item => item.id === id);
            
            if (itemIndex !== -1 && state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;
                state.products[itemIndex].totalPrice -= state.products[itemIndex].price; 
                state.totalQuantity -= 1; 
                state.totalPrice -= state.products[itemIndex].price; 
            } else if (itemIndex !== -1 && state.products[itemIndex].quantity === 1) {
                state.totalQuantity -= 1;
                state.totalPrice -= state.products[itemIndex].price;
                state.products = state.products.filter(item => item.id !== id);
            }
        }

    },

})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer