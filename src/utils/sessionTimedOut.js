import { changeLocalStorage, checkToken } from "./checkToken"

export const sessionTimedOut=(dispatch,setLoggedIn)=>{
   if( checkToken()){
    changeLocalStorage('remove');
    dispatch(setLoggedIn(false));
   }
}