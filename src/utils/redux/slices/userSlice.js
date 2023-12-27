import { createSlice } from "@reduxjs/toolkit";


const initialState={
    userDetails: null,
    loggedIn: false
}

export const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        setLoggedIn: (state,action)=>{
            if(!action.payload){
                state.loggedIn=false;
                state.userDetails=null;
            }
            else{
                state.loggedIn=true;
            }
        },
        setUserDetails: (state,action)=>{
            state.userDetails=action.payload;
        }
    }
})

export const {setLoggedIn,setUserDetails}=userSlice.actions;
export default userSlice.reducer;