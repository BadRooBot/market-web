import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser:null,
    loading:false,
    IsLogin:false,
    error:false

  },
  reducers: {
    loginStart: (state) => {
        state.loading=true
     
    },
    loginSuccess: (state,action) => {
     state.loading=false
     state.currentUser=action.payload
     state.IsLogin=true
    },
    loginfailure: (state) => {
        state.loading=false
        state.error=true
    },
    logout:(state)=>{
        state.currentUser=null,
        state.loading=false,
        state.error=false
        state.IsLogin=false
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginfailure ,logout} = userSlice.actions

export default userSlice.reducer