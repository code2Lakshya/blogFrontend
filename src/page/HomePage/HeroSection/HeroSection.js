import { useEffect, useState } from "react";
import { fetchData } from '../../../utils/fetchData';
import Wrapper from "../../../components/Wrapper/Wrapper";
import Card from "./Card/Card";
import './HeroSection.css';

const HeroSection = () => {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchData('/allposts')
            .then(response => {
                setData(response.splice(0, 5));
                setLoader(false);
            })
            .catch(error => {
                console.log(error.message);
                setLoader(false);
            });
    }, [])

    console.log(data);

    return (
        <div className="hero-section-container">
            <Wrapper className='hero-section-wrapper'>
                {
                    loader ?
                        <p>Loader</p>
                        :
                        !data ?
                            <p></p>
                            :
                            <div className="hero-section-cards">
                                <div className="hero-large-card">
                                    <Card data={data[0]} key={data._id} />
                                </div>
                                <div className="hero-small-card">
                                    {
                                        data.splice(1, 4).map((item) => <Card data={item} key={item._id} />)
                                    }
                                </div>
                            </div>
                }
            </Wrapper>
        </div>
    );
}
export default HeroSection;