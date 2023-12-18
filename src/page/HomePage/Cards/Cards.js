import CommonCard from "../../../components/CommonCard/CommonCard";
import './Cards.css';

const Cards=({className,data})=>{

    return(
        <div className={`cards ${className ? className : ''}`}>
        {
            data.map(item => <CommonCard data={item} key={item._id} />)
        }
        </div>
    );
}
export default Cards;