import { createSlice } from '@reduxjs/toolkit'

export const dbSlice = createSlice({
  name: 'db',
  initialState: {
    currentProduct:null,
    selectedProduct:null,
    currentUser:null,
    selectedUser:null,
    loading:false,
    error:false,
    countOfProduct:0,
    countOfUsers:0

  },
  reducers: {
    loginStart: (state) => {
        state.loading=true
     
    },
    saveOneProductdata: (state,action) => {
      state.loading=false
      state.selectedProduct=action.payload
     },
     saveOneUserdata: (state,action) => {
      state.loading=false
      state.selectedUser=action.payload
     },
    loadProductSuccess: (state,action) => {
      state.currentProduct=null

     state.loading=false
     state.currentProduct=action.payload
    },
    saveSelectedUaserData: (state,action) => {
      state.currentUser=null
      state.loading=false
      state.currentUser=action.payload
     },
    loginfailure: (state) => {
        state.loading=false
        state.error=true
    },
    deleteAll:(state)=>{
        state.currentProduct=null
        state.currentUser=null
        state.selectedUser=null
        state.selectedProduct=null
        state.loading=false
        state.error=false
        state.countOfProduct=0
        state.countOfUsers=0
    },
    productCount:(state,action)=>{
      state.countOfProduct=action.payload
    },
    usersCount:(state,action)=>{
      state.countOfUsers=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loadProductSuccess,saveSelectedUaserData, loginfailure ,deleteAll,productCount,usersCount,saveOneProductdata,saveOneUserdata} = dbSlice.actions

export default dbSlice.reducer