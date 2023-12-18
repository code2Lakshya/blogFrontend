import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/fetchData";
import Loader from "../../../components/Loader/Loader";
import CommonCard from "../../../components/CommonCard/CommonCard";
import './RandomCard.css';

const RandomCard = ({className}) => {

    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        fetchData('/randompost')
            .then(response => {
                setData(response);
                setLoader(false);
            })
            .catch(error => {
                console.log(error.message);
                setLoader(false);
            })
    }, [])

    return (
        <div className={`random-card-container ${className ? className : ''}`}>
            {
                loader
                    ?
                    <Loader />
                    :
                    data
                    &&
                    <CommonCard data={data} className='random-card' showContent={true} />
            }
        </div>
    );
}
export default RandomCard;