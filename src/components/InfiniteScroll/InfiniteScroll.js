import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import './InfiniteScroll.css';

const InfiniteScroll = ({loader,changePage}) => {

    const element = useRef(null);
    const [message,setMessage]=useState(false);
    const changePageRef=useRef(changePage);
    const previousScroll=useRef(0);

    changePageRef.current=changePage;


    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            if (window.innerHeight - 50 >= Math.round(element?.current?.getBoundingClientRect()?.top) && window.scrollY > previousScroll.current) {
               if(!(changePageRef.current()))
               setMessage(true);
            }
            previousScroll.current=window.scrollY;
        })
    }, [])

    return (
        <div className="infinite-scroll-container" ref={element}>
        {
            loader ? 
            <Loader />
            :
            ''
        }
        {
            message && <p>No More Posts Left...</p>
        }
        </div>
    );
}
export default InfiniteScroll;