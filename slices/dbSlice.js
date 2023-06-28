import { createSlice } from '@reduxjs/toolkit'

export const dbSlice = createSlice({
  name: 'db',
  initialState: {
    currentVideo:null,
    currentUser:null,
    loading:false,
    error:false,
    countOfMovies:0,
    countOfUsers:0

  },
  reducers: {
    loginStart: (state) => {
        state.loading=true
     
    },
    loadVideoSuccess: (state,action) => {
     state.loading=false
     state.currentVideo=action.payload
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
        state.currentVideo=null
        state.currentUser=null
        state.loading=false
        state.error=false
        state.countOfMovies=0
        state.countOfUsers=0
    },
    moviesCount:(state,action)=>{
      state.countOfMovies=action.payload
    },
    usersCount:(state,action)=>{
      state.countOfUsers=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loadVideoSuccess,saveSelectedUaserData, loginfailure ,deleteAll,moviesCount,usersCount} = dbSlice.actions

export default dbSlice.reducer