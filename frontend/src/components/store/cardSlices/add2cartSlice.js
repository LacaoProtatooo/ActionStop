import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Helper function to save data to localStorage
const saveToLocalStorage = (state) => {
    try {
        localStorage.setItem('cartData', JSON.stringify(state)); // Store array in localStorage
    } catch (e) {
        console.warn("Failed to save cart data to localStorage", e);
    }
};

// Load initial state from localStorage
const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cartData');
        // Ensure the state is always an array, even if the data is malformed
        const parsedState = serializedState ? JSON.parse(serializedState) : [];
        return Array.isArray(parsedState) ? parsedState : []; // Fallback to an empty array if not an array
    } catch (e) {
        console.warn("Failed to load cart data from localStorage", e);
        return []; // Return empty array if there's an error
    }
};

// Initial state loaded from localStorage
const initialState = {
    cartItems: loadFromLocalStorage(),
    total: 0, // Store the calculated total here
};

const add2CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, origin, price, image, quantity } = action.payload;

            // Check if the item already exists in the cart
            const existingItem = state.find(item => item.id === id);

            if (existingItem) {
                // Update quantity if item exists
                existingItem.quantity += quantity;
                toast.success(`Updated! ${name} quantity added to Cart`);
            } else {
                // Add new item to the cart
                state.cartItems.push({ id, name, origin, price, image, quantity });
                toast.success(`Saved! ${name} added to Cart`);
            }

            saveToLocalStorage(state); // Save updated cart to localStorage
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            // Find the item by ID
            console.log(quantity)
            const item = state.cartItems.find(item => item.id === id);
            if (!item) {
                toast.error("Item doesn't exist in the cart");
                return; // Exit without modifying the state
            }

            if (quantity < 1) {
                // Remove item if quantity is less than 1
                const index = state.cartItems.findIndex(item => item.id === id);
                if (index) {
                    state.splice(index, 1);
                } // Remove item
                toast.success("Item removed from the cart");
            } else {
                // Update quantity
                // console.log(id)
                
                
                item.quantity = quantity;
                toast.success("Quantity updated");
            }
           
            saveToLocalStorage(state); // Save updated cart to localStorage
        },
        resetCart: (state) => {
            // Clear the cart
            state.cartItems.splice(0, state.length); // Efficiently reset the array
            saveToLocalStorage(state); // Save empty cart to localStorage
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;

            // Find the item by ID and remove it from the Redux state
            const index = state.findIndex(item => item.id === id);
            if (index) {
                state.splice(index, 1); // Remove the item from Redux state
                toast.success("Item removed from the cart");
            } else {
                toast.error("Item not found in the cart");
            }
        
            // Update cart data in localStorage
            const updatedCart = state;  // The updated cart after removal
        
            // Save updated cart state to localStorage
            saveToLocalStorage(updatedCart);
        
            // Save updated cart to localStorage (assuming `cartData` as the key)
            localStorage.setItem('cartData', JSON.stringify(updatedCart));
        },
        calculateTotal: (state) => {
            state.total = state.cartItems.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);

            toast.info(`Current Total: ${state.total}`);
        },
    },
});


export const { addToCart, updateQuantity, resetCart, removeFromCart, calculateTotal } = add2CartSlice.actions;

export default add2CartSlice.reducer;