// slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 ,color:action.payload.color});
      }
      state.isOpen = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product_id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.product_id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    deleteAllItemCar:(state)=>{
        state.items=[]
        state.isOpen=false
    },
    setCartOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, deleteAllItemCar,setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;