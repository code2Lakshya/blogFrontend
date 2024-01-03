import {useEffect} from 'react';


export const useScrollToTop=(state)=>{

const dependency=state ? [state]: []; 

    useEffect(()=>{
        window.scrollTo(0,0);
    },dependency)
}