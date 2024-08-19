// slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    items: null,
    myOrder:[],
    myProduct:null
  },
  reducers: {
    saveOrder: (state, action) => {
        state.items=action.payload;
    },
    saveMyOrder: (state, action) => {
      state.myOrder=action.payload;
    },
    saveMyProduct: (state, action) => {
      state.myProduct=action.payload;
    },
    deleteAllOrder:(state)=>{
        state.items=null
    },
    addItemToList:(state,action)=>{
      var newList={...state.items,...action.payload};
      // state.items=newList;
    }
  },
});

export const { saveOrder, deleteAllOrder,addItemToList,saveMyProduct,saveMyOrder} = orderSlice.actions;
export default orderSlice.reducer;