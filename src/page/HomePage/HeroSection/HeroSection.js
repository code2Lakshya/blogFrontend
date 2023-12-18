import { useEffect, useState } from "react";
import { fetchData } from '../../../utils/fetchData';
import Wrapper from "../../../components/Wrapper/Wrapper";
import Card from "./Card/Card";
import './HeroSection.css';
import Loader from "../../../components/Loader/Loader";

const HeroSection = () => {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        fetchData('/fixed?limit=5')
            .then(response => {
                setData(response.posts);
                setLoader(false);
            })
            .catch(error => {
                console.log(error.message);
                setLoader(false);
            });
    }, [])


    return (
        <div className="hero-section-container">
            <Wrapper className='hero-section-wrapper'>
                {
                    loader ?
                        <Loader />
                        :
                        !data ?
                            <p style={{textAlign: 'center'}}>No Data Found ...</p>
                            :
                            <div className="hero-section-cards">
                                <div className="hero-large-card">
                                    <Card data={data[0]} key={data._id} />
                                </div>
                                <div className="hero-small-card">
                                    {
                                        data
                                            .filter((item, index) => index !== 0)
                                            .map((item) => <Card data={item} key={item._id} />)
                                    }
                                </div>
                            </div>
                }
            </Wrapper>
        </div>
    );
}
export default HeroSection;