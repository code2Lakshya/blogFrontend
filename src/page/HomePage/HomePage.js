import HeroSection from "./HeroSection/HeroSection";
import RandomCard from "./RandomCard/RandomCard";
import './HomePage.css';
import Wrapper from "../../components/Wrapper/Wrapper";
import Loader from "../../components/Loader/Loader";
import Cards from "./Cards/Cards";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [infiniteLoader, setInfiniteLoader] = useState(false);

    useEffect(() => {
        page === 1 ? setLoader(true) : setInfiniteLoader(true);
        fetchData(`/fixed?page=${page}&skip=5`)
            .then(response => {
                setData(prev => prev ? ([...prev, ...response.posts]) : response.posts);
                setTotalPage(response.totalPage);
                setLoader(false);
                setInfiniteLoader(false);
            })
            .catch(error => {
                console.log(error.message);
                setLoader(false);
                setInfiniteLoader(false);
            })
    }, [page])

    const changePage = () => {
        if (page < totalPage) {
            setPage(page + 1);
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div className="home-page">
            <HeroSection />
            <div className="home-main-container">
                <Wrapper className='home-main-wrapper'>
                    <div className="home-content">
                        <RandomCard className='home-random-container' />
                        {
                            loader ? <Loader />
                                : !data ? <p style={{textAlign: 'center'}}>No Data Found ...</p>
                                    :
                                    <Cards data={data} className='home-cards' />
                        }
                        <InfiniteScroll
                            loader={infiniteLoader}
                            changePage={changePage}
                        />
                    </div>
                   <Sidebar />
                </Wrapper>
            </div>
        </div>
    );
}
export default HomePage;